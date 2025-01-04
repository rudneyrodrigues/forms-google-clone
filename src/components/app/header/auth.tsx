import { FC, memo } from 'react'
import { Link } from 'react-router'
import { SiGoogleforms } from 'react-icons/si'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { HStack, Input, Link as ChakraLink, Text } from '@chakra-ui/react'

import { UserMenu } from '../menu/user'
import { InputGroup } from '@/components/ui/input-group'

export const HeaderAuth: FC = memo((): JSX.Element => {
	return (
		<HStack
			px={8}
			py={4}
			w='full'
			as='header'
			borderBottom='1px solid'
			borderColor='border'
		>
			<HStack w='full'>
				<ChakraLink asChild>
					<Link to='/dashboard'>
						<SiGoogleforms size={32} />
						<Text
							as='span'
							display={['none', 'block']}
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
				</ChakraLink>

				<HStack w='full' mx={[2, 4, 8]} maxW='breakpoint-sm'>
					<InputGroup w='full' startElement={<FaMagnifyingGlass />}>
						<Input
							bg='bg.muted'
							type='search'
							border='none'
							rounded='full'
							placeholder='Pesquisar'
						/>
					</InputGroup>
				</HStack>

				<HStack ml='auto'>
					<UserMenu />
				</HStack>
			</HStack>
		</HStack>
	)
})
HeaderAuth.displayName = 'HeaderAuth'
