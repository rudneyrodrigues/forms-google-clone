import { FC, memo } from 'react'
import { Link } from 'react-router'
import { SiGoogleforms } from 'react-icons/si'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { HStack, Input, Link as ChakraLink, Text } from '@chakra-ui/react'

import { UserMenu } from '../menu/user'
import { useIsMobile } from '@/hooks/use-mobile'
import { InputGroup } from '@/components/ui/input-group'

interface HeaderAuthProps {
	title?: string
	showSearch?: boolean
}

export const HeaderAuth: FC<HeaderAuthProps> = memo(
	({ title, showSearch = false }: HeaderAuthProps): JSX.Element => {
		const isMobile = useIsMobile()

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
								truncate
								as='span'
								maxW='14rem'
								fontSize='xl'
								color='fg.muted'
								fontWeight='bold'
								transition='colors'
								display={showSearch ? ['none', 'block'] : 'block'}
								_hover={{
									color: 'fg'
								}}
							>
								{isMobile ? 'Forms' : title || 'Forms'}
							</Text>
						</Link>
					</ChakraLink>

					{showSearch && (
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
					)}

					<HStack ml='auto'>
						<UserMenu />
					</HStack>
				</HStack>
			</HStack>
		)
	}
)
HeaderAuth.displayName = 'HeaderAuth'
