import { FC } from 'react'
import { Link } from 'react-router'
import { SiGoogleforms } from 'react-icons/si'
// import { LuChevronDown } from 'react-icons/lu'
import {
	Flex,
	Group,
	VStack,
	HStack,
	Heading,
	LinkBox,
	SimpleGrid,
	LinkOverlay,
	Text
	// IconButton
} from '@chakra-ui/react'

import { useAuth } from '@/hooks/use-auth'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { HeaderAuth } from '@/components/app/header/auth'
import { useGetAllForms } from '@/hooks/swr/useGetAllForms'
// import {
// 	MenuItem,
// 	MenuRoot,
// 	MenuTrigger,
// 	MenuContent
// } from '@/components/ui/menu'

export const Dashboard: FC = (): JSX.Element => {
	const { user } = useAuth()
	const { data, error, isLoading } = useGetAllForms({ userId: user.uid })

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

					<VStack w='full' gap={4} flex={1}>
						{isLoading ? (
							<SimpleGrid w='full' columns={[1, 2, 3, 4]} gap={4}>
								{new Array(4).fill(0).map((_, index) => (
									<Skeleton key={index} aspectRatio={4 / 3} />
								))}
							</SimpleGrid>
						) : error ? (
							<Alert status='error' title='Erro ao carregar formulários'>
								Ocorreu um erro ao carregar os formulários recentes do servidor.
							</Alert>
						) : data && data.length <= 0 ? (
							<Alert status='info' title='Nenhum formulário encontrado'>
								Você ainda não criou nenhum formulário. Clique no botão "Criar
								formulário" para começar.
							</Alert>
						) : (
							data &&
							data.length > 0 && (
								<SimpleGrid w='full' columns={[1, 2, 3, 4]} gap={4}>
									{data.map(form => (
										<LinkBox
											as='article'
											rounded='md'
											key={form.id}
											display='flex'
											borderWidth={1}
											flexDir='column'
											transition='colors'
											borderColor='border'
											justifyContent='space-between'
											_hover={{
												borderColor: 'fg'
											}}
										>
											<HStack
												w='full'
												roundedTop={4}
												bg='bg.muted'
												justify='center'
												aspectRatio={[16 / 9, 4 / 3, 2 / 1]}
											>
												<SiGoogleforms size={32} />
											</HStack>

											<VStack p={4} align='start'>
												<Heading fontWeight='bold' lineHeight='shorter'>
													{form.title}
												</Heading>

												<Text
													color='fg.muted'
													fontSize='sm'
													lineHeight='shorter'
												>
													{form.description}
												</Text>

												<Button w='full' size='sm' variant='outline' asChild>
													<LinkOverlay asChild>
														<Link to={`/form/${form.id}`}>Visualizar</Link>
													</LinkOverlay>
												</Button>
											</VStack>
										</LinkBox>
									))}
								</SimpleGrid>
							)
						)}
					</VStack>
				</VStack>
			</Flex>
		</VStack>
	)
}
