import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import { Meeting } from '@/app/models/Meeting';
import { Task } from '@/app/models/Task';
import { User } from '@/app/models/User';
import { auth } from '@clerk/nextjs/server';
import { processMeetingTranscript } from '@/app/services/logic/analyse_transcript';

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { transcript, title, date, category } = await req.json();

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript text is required' }, { status: 400 });
    }

    // 1. Process transcript with AI
    const analysisResult = await processMeetingTranscript(transcript);

    // 2. Create Meeting
    // Note: We use the current date as default since transcript doesn't inherently have it
    const newMeeting = new Meeting({
      title: title || analysisResult.title,
      summary: analysisResult.summary,
      date: date ? new Date(date) : new Date(),
      duration: '0m', // Placeholder, could be calculated from transcript timestamps if sophisticated
      transcript: analysisResult.transcript,
      mom: analysisResult.mom,
      currentStatus: 'Completed', // Assuming analyzed meetings are done
      tags: analysisResult.tags,
      category: category || analysisResult.category,
      confidenceLevel: analysisResult.confidence_level,
      user: user._id,
      tasks: [],
    });

    const savedMeeting = await newMeeting.save();

    // 3. Create Tasks
    const taskPromises = analysisResult.tasks.map(async (taskItem) => {
      const newTask = new Task({
        title: taskItem.title,
        description: taskItem.description,
        priority: taskItem.priority || 'Medium',
        tags: taskItem.tags,
        status: 'Backlog', // Default status
        sourceMeeting: savedMeeting._id,
        suggested: true, // Mark as AI suggested
        user: user._id,
      });
      return newTask.save();
    });

    const savedTasks = await Promise.all(taskPromises);

    // 4. Link Tasks to Meeting
    savedMeeting.tasks = savedTasks.map((t) => t._id);
    await savedMeeting.save();

    return NextResponse.json({
      meeting: savedMeeting,
      tasks: savedTasks,
    }, { status: 201 });

  } catch (error) {
    console.error('Error analyzing transcript and creating entries:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
