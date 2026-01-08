
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import { Task } from '@/app/models/Task';
import { User } from '@/app/models/User';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
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

    const tasks = await Task.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('sourceMeeting', 'title'); // Populate meeting title for context if needed

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
