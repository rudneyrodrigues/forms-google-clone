import { FC } from 'react'
import { parseCookies } from 'nookies'
import { Navigate, Outlet } from 'react-router-dom'

const RedirectLogin: FC = (): JSX.Element => {
	const cookies = parseCookies()

	if (cookies['@user.uid']) {
		return <Navigate to='/dashboard' />
	}

	return <Outlet />
}
RedirectLogin.displayName = 'RedirectLogin'

export { RedirectLogin }
