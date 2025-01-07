import { FC } from 'react'
import { Link } from 'react-router'
import { MdMoreVert } from 'react-icons/md'
import { SiGoogleforms } from 'react-icons/si'
import {
	Flex,
	Text,
	Group,
	Float,
	VStack,
	HStack,
	Heading,
	LinkBox,
	IconButton,
	SimpleGrid,
	LinkOverlay
} from '@chakra-ui/react'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { HeaderAuth } from '@/components/app/header/auth'
import { useGetAllForms } from '@/hooks/swr/useGetAllForms'
import { MoreFormDashboard } from '@/components/app/menu/more-form-dashboard'

export const Dashboard: FC = (): JSX.Element => {
	const { data, error, isLoading } = useGetAllForms()

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth showSearch />

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
							<EmptyState
								icon={<SiGoogleforms size={32} />}
								title='Nenhum formulário encontrado'
								description='Você ainda não criou nenhum formulário. Crie um formulário para começar a coletar respostas.'
							/>
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
											position='relative'
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
												bg='bg.muted/40'
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

											<MoreFormDashboard form={form}>
												<Float offset={6}>
													<IconButton size='sm' variant='ghost'>
														<MdMoreVert />
													</IconButton>
												</Float>
											</MoreFormDashboard>
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
