import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ensureUserSynced } from '../lib/syncUser'
import { Sidebar } from '@/components/sidebar'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const { userId } = await auth()
	if (!userId) {
		redirect('/sign-in')
	}

	await ensureUserSynced()
	
	return (
		<div className="flex h-screen w-full bg-gray-50">
			<Sidebar />
			<main className="flex-1 m-3 rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden relative">
				<div className="h-full overflow-y-auto">
					{children}
				</div>
			</main>
		</div>
	)
}


