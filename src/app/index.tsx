import { FC } from 'react'
import { Outlet } from 'react-router'

import { AuthProvider } from '@/contexts/auth-context'

export const App: FC = (): JSX.Element => {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	)
}
