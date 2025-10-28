import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ensureUserSynced } from '../lib/syncUser'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const { userId } = await auth()
	if (!userId) {
		redirect('/sign-in')
	}

	await ensureUserSynced()
	return <>{children}</>
}


