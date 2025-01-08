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
import { ErrorFormEdit } from '@/app/form/edit/error'
import { loaderFormEdit } from '@/app/form/edit/loader'

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
								element: <FormEdit />,
								loader: loaderFormEdit,
								errorElement: <ErrorFormEdit />
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
