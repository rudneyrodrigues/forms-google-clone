import { FC, memo } from 'react'
import { SiGoogleforms } from 'react-icons/si'
import { Flex, HStack, Link, Text } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'

export const Header: FC = memo((): JSX.Element => {
	return (
		<HStack
			px={8}
			py={4}
			w='full'
			borderBottom='1px solid'
			borderColor='border'
		>
			<HStack maxW='breakpoint-xl' mx='auto' w='full'>
				<Link href='/'>
					<SiGoogleforms />
					<Text
						as='span'
						fontSize='xl'
						color='fg.muted'
						fontWeight='bold'
						transition='colors'
						_hover={{
							color: 'fg'
						}}
					>
						Forms
					</Text>
				</Link>

				<Flex ml={6} align='center' justify='center'>
					<Button variant='ghost' asChild>
						<Link href='#'>Visão geral</Link>
					</Button>
					<Button variant='ghost' asChild>
						<Link href='#'>Recursos</Link>
					</Button>
					<Button variant='ghost' asChild>
						<Link href='#'>Segurança</Link>
					</Button>
				</Flex>

				<HStack ml='auto'>
					<Button variant='ghost' asChild>
						<Link href='#'>Fazer login</Link>
					</Button>
					<Button asChild>
						<Link href='#'>Conheça o Forms</Link>
					</Button>
				</HStack>
			</HStack>
		</HStack>
	)
})
Header.displayName = 'Header'
