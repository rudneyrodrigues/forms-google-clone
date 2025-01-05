import { createBrowserRouter } from 'react-router'

import { App } from '@/app'
import { Login } from '@/app/login'
import { Profile } from '@/app/profile'
import { FormNew } from '@/app/form/new'
import { Register } from '@/app/register'
import { Dashboard } from '@/app/dashboard'
import { PrivateRoutes } from './private-routes'
import { RedirectLogin } from './redirect-login'

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				element: <RedirectLogin />,
				children: [
					{
						path: '/',
						element: <Login />
					},
					{
						path: '/register',
						element: <Register />
					}
				]
			},
			{
				element: <PrivateRoutes />,
				children: [
					{
						path: '/dashboard',
						element: <Dashboard />
					},
					{
						path: '/form/new',
						element: <FormNew />
					},
					{
						path: '/profile',
						element: <Profile />
					}
				]
			}
		]
	}
])
