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

    let transcriptText = '';
    let transcriptUrl = '';
    let requestTitle = '';
    let requestDate: Date | null = null;
    let requestCategory = '';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      transcriptText = body.transcript || '';
      requestTitle = body.title || '';
      if (body.date) requestDate = new Date(body.date);
      requestCategory = body.category || '';
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      transcriptUrl = (formData.get('transcriptUrl') as string) || '';
      
      requestTitle = (formData.get('title') as string) || '';
      const dateStr = formData.get('date') as string;
      if (dateStr) requestDate = new Date(dateStr);
      requestCategory = (formData.get('category') as string) || '';

      if (file) {
        transcriptText = await file.text();
      }
    }

    if (!transcriptText) {
      return NextResponse.json({ error: 'Transcript text is required' }, { status: 400 });
    }

    // 1. Process transcript with AI
    const analysisResult = await processMeetingTranscript(transcriptText);

    // 2. Create Meeting
    // Note: We use the current date as default since transcript doesn't inherently have it
    const newMeeting = new Meeting({
      title: requestTitle || analysisResult.title,
      summary: analysisResult.summary,
      date: requestDate ? requestDate : new Date(),
      duration: '0m', // Placeholder, could be calculated from transcript timestamps if sophisticated
      transcript: analysisResult.transcript,
      mom: analysisResult.mom,
      currentStatus: 'Completed', // Assuming analyzed meetings are done
      tags: analysisResult.tags,
      category: requestCategory || analysisResult.category,
      confidenceLevel: analysisResult.confidence_level,
      transcriptUrl: transcriptUrl,
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
