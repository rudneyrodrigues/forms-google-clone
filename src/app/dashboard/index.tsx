import { FC } from 'react'
import { Link } from 'react-router'
// import { LuChevronDown } from 'react-icons/lu'
import {
	Flex,
	Text,
	Group,
	VStack,
	HStack,
	Heading
	// IconButton
} from '@chakra-ui/react'

import { Button } from '@/components/ui/button'
import { HeaderAuth } from '@/components/app/header/auth'
// import {
// 	MenuItem,
// 	MenuRoot,
// 	MenuTrigger,
// 	MenuContent
// } from '@/components/ui/menu'

export const Dashboard: FC = (): JSX.Element => {
	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={8} flex={1} w='full'>
				<VStack w='full' mx='auto' maxW='breakpoint-xl'>
					<HStack w='full' pb={4}>
						<Heading>Formulários recentes</Heading>

						<Group
							ml='auto'
							// attached
						>
							<Button size='sm' variant='outline'>
								<Link to='/form/new'>Criar formulário</Link>
							</Button>
							{/* <MenuRoot positioning={{ placement: 'bottom-start' }}>
								<MenuTrigger asChild>
									<IconButton
										size='sm'
										variant='outline'
										roundedTopLeft={0}
										roundedBottomLeft={0}
									>
										<LuChevronDown />
									</IconButton>
								</MenuTrigger>

								<MenuContent>
									<MenuItem value='model'>Selecionar modelo</MenuItem>
								</MenuContent>
							</MenuRoot> */}
						</Group>
					</HStack>

					<VStack w='full' flex={1}>
						<Text>Dashboard</Text>
					</VStack>
				</VStack>
			</Flex>
		</VStack>
	)
}
