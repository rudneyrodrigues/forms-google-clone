import { createBrowserRouter } from 'react-router'

import { App } from '@/app'
import { Login } from '@/app/login'
import { Profile } from '@/app/profile'
import { FormNew } from '@/app/form/new'
import { Register } from '@/app/register'
import { FormEdit } from '@/app/form/edit'
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
						path: '/form',
						children: [
							{
								path: 'new',
								element: <FormNew />
							},
							{
								path: ':id',
								element: <FormEdit />
							}
						]
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
