import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import { User } from '@/app/models/User'

export async function GET() {
	const { userId } = await auth()
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	await connectToDatabase()
	const user = await User.findOne({ clerkId: userId })
	if (!user) {
		return NextResponse.json({ error: 'Not found' }, { status: 404 })
	}

	return NextResponse.json({
		id: user._id,
		clerkId: user.clerkId,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		imageUrl: user.imageUrl,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	})
}


