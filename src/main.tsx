import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Analytics } from '@vercel/analytics/react'

import { router } from './routes'
import { Provider } from '@/components/ui/provider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider>
			<Analytics />
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
