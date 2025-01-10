import { FC } from 'react'
import { Link } from 'react-router'
import { SiGoogleforms } from 'react-icons/si'
import { Center, HStack, Heading, Mark, Text, VStack } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'

export const ErrorPage: FC = (): JSX.Element => {
	return (
		<VStack minH='100vh' w='full'>
			<Center flex={1} flexDir='column' gap={8} p={4}>
				<HStack>
					<SiGoogleforms size={32} />
					<Heading fontSize='3xl' fontWeight='bold'>
						Forms
					</Heading>
				</HStack>

				<VStack gap={0}>
					<Text>
						Pedimos desculpas, mas ocorreu um{' '}
						<Mark variant='subtle' colorPalette='red'>
							erro ao carregar a página
						</Mark>
						.
					</Text>

					<Text color='fg.muted'>Por favor, tente novamente mais tarde.</Text>
				</VStack>

				<Button asChild>
					<Link to='/dashboard'>Voltar para o Dashboard</Link>
				</Button>
			</Center>
		</VStack>
	)
}
