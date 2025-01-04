import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: {
					value: 'Nunito, Inter, sans-serif',
					description: 'The font used for headings'
				},
				body: {
					value: 'Nunito, Inter, sans-serif',
					description: 'The font used for body text'
				}
			}
		}
	}
})

export const system = createSystem(defaultConfig, config)
