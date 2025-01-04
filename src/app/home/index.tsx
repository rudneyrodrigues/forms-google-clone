import { FC } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { Center, Heading, Link, Text, VStack } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'
import { Header } from '@/components/app/header'

export const Home: FC = (): JSX.Element => {
	return (
		<VStack minH='100vh' w='full'>
			<Header />

			<Center w='full' px={8} py={12} maxW='breakpoint-lg' mx='auto'>
				<VStack spaceY={6}>
					<Heading
						fontSize='4xl'
						fontWeight='bold'
						textAlign='center'
						lineHeight={1.2}
					>
						Gere insights facilmente com o Forms
					</Heading>
					<Text fontSize='lg' textAlign='center'>
						Crie e compartilhe facilmente formulários e pesquisas on-line e
						analise as respostas em tempo real.
					</Text>

					<VStack w='full'>
						<Button w='full' asChild>
							<Link href='#'>Conheça o Forms</Link>
						</Button>
						<Button w='full' variant='outline' asChild>
							<Link href='#'>Acesse o Forms</Link>
						</Button>
					</VStack>

					<Text textAlign='center' fontSize='lg' color='fg.muted'>
						Não tem uma conta?{' '}
						<Link href='#' color='primary'>
							Inscreva-se
						</Link>
					</Text>
				</VStack>
			</Center>

			<Link
				px={4}
				href='#'
				display='flex'
				flexDir='column'
				alignItems='center'
				justifyContent='center'
			>
				<Text as='span' fontSize='md'>
					Veja o que você pode fazer no Forms
				</Text>
				<MdOutlineKeyboardArrowDown size={24} />
			</Link>
		</VStack>
	)
}
