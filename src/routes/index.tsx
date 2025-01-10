import { createBrowserRouter } from 'react-router'

import { App } from '@/app'
import { Login } from '@/app/login'
import { FormEdit } from '@/app/form'
import { Profile } from '@/app/profile'
import { ErrorPage } from '@/app/error'
import { Register } from '@/app/register'
import { FormView } from '@/app/form/view'
import { Dashboard } from '@/app/dashboard'
import { PrivateRoutes } from './private-routes'
import { RedirectLogin } from './redirect-login'
import { loaderFormEdit } from '@/app/form/loader'
import { loaderFormView } from '@/app/form/view/loader'

export const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <ErrorPage />,
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
								path: ':id/',
								element: <FormEdit />,
								loader: loaderFormEdit,
								errorElement: <ErrorPage />
							},
							{
								path: ':id/view',
								element: <FormView />,
								loader: loaderFormView,
								errorElement: <ErrorPage />
							}
						]
					},
					{
						path: '/profile',
						element: <Profile />,
						errorElement: <ErrorPage />
					}
				]
			}
		]
	}
])
