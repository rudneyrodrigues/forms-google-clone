import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Analytics } from '@vercel/analytics/react'

import { router } from './routes'
import { Toaster } from './components/ui/toaster'
import { Provider } from '@/components/ui/provider.tsx'

const root = createRoot(document.getElementById('root')!)
root.render(
	<StrictMode>
		<Provider>
			<Toaster />
			<Analytics />
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
