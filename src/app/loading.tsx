import { FC, memo } from 'react'
import { SiGoogleforms } from 'react-icons/si'
import {
	Text,
	Center,
	HStack,
	VStack,
	Heading,
	Spinner
} from '@chakra-ui/react'

const LoadingPage: FC = memo((): JSX.Element => {
	return (
		<VStack minH='100vh'>
			<Center flex={1} flexDir='column' gap={2}>
				<HStack>
					<SiGoogleforms size={32} />
					<Heading
						as='h1'
						fontSize='2xl'
						fontWeight='bold'
						textTransform='uppercase'
					>
						Formulários
					</Heading>
				</HStack>
				<Text fontSize='sm' color='fg.muted' animation='pulse'>
					Carregando informações, aguarde...
				</Text>
				<Spinner size='xl' />
			</Center>
		</VStack>
	)
})
LoadingPage.displayName = 'LoadingPage'

export { LoadingPage }
