import { FC } from 'react'
import { parseCookies } from 'nookies'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'
import { LoadingPage } from '@/app/loading'

const PrivateRoutes: FC = (): JSX.Element => {
	const { user } = useAuth()
	const cookies = parseCookies()

	if (!user.uid) {
		return <LoadingPage />
	}

	if (!cookies['@user.uid']) {
		return <Navigate to='/' />
	}

	return <Outlet />
}
PrivateRoutes.displayName = 'PrivateRoutes'

export { PrivateRoutes }
