import { FC } from 'react'
import { Outlet, useNavigation } from 'react-router'

import { LoadingPage } from './loading'
import { AuthProvider } from '@/contexts/auth-context'

export const App: FC = (): JSX.Element => {
	const navigation = useNavigation()
	const isLoading = navigation.state === 'loading'

	return <AuthProvider>{isLoading ? <LoadingPage /> : <Outlet />}</AuthProvider>
}
