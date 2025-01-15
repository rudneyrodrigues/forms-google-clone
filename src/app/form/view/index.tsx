import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { LuAsterisk } from 'react-icons/lu'
import {
	Flex,
	Text,
	Input,
	Stack,
	VStack,
	HStack,
	Heading,
	Textarea,
	Fieldset,
	// Separator,
	CheckboxGroup,
	createListCollection
} from '@chakra-ui/react'

import { ErrorPage } from '@/app/error'
import { LoadingPage } from '@/app/loading'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup } from '@/components/ui/input-group'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { useGetFormById } from '@/hooks/swr/useGetFormById'
import { ProgressBar, ProgressRoot } from '@/components/ui/progress'
import {
	SelectRoot,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValueText
} from '@/components/ui/select'

export const FormView: FC = (): JSX.Element => {
	const { id } = useParams() as { id: string }
	const [loading, setLoading] = useState(false)
	const { data, error, isLoading } = useGetFormById({ id })

	if (isLoading) {
		return <LoadingPage />
	}

	if (error || !data) {
		return <ErrorPage />
	}

	const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
		e.preventDefault()
		setLoading(true)

		await new Promise(resolve => setTimeout(resolve, 2000))

		toaster.success({
			title: 'Formulário enviado',
			description: 'O formulário foi enviado com sucesso!',
			action: {
				label: 'Ok',
				onClick: () => {}
			}
		})
		setLoading(false)
	}

	return (
		<VStack minH='100vh' w='full'>
			{data.presentations.showProgressBar && (
				<VStack
					px={4}
					py={2}
					gap={4}
					bg='bg'
					w='full'
					top={0}
					zIndex={1}
					position='sticky'
				>
					<HStack w='full' maxW='breakpoint-lg'>
						<ProgressRoot min={0} w='full' animated max={100} value={10}>
							<ProgressBar />
						</ProgressRoot>
					</HStack>
				</VStack>
			)}

			<Flex px={2} pt={4} pb={12} w='full'>
				<VStack
					gap={8}
					w='full'
					as='form'
					mx='auto'
					rounded='md'
					align='start'
					maxW='breakpoint-md'
					onSubmit={handleSubmit}
				>
					<VStack
						py={8}
						gap={8}
						w='full'
						rounded='md'
						align='start'
						border='1px dashed'
						borderColor='border'
					>
						<VStack px={4} w='full'>
							<Heading
								color='fg'
								fontSize='3xl'
								fontWeight='bold'
								textAlign='center'
							>
								{data.title}
							</Heading>
							<Text color='fg.subtle' fontSize='sm'>
								{data.description}
							</Text>
						</VStack>

						{/* <Separator />

						<HStack px={4} w='full' justify='space-between'>
							<Text
								gap={1}
								fontSize='sm'
								color='red.solid'
								display='inline-flex'
							>
								<LuAsterisk />
								Indica uma pergunta obrigatória
							</Text>
						</HStack> */}
					</VStack>

					{data.questions.map((question, index) => {
						return (
							<VStack
								p={6}
								gap={6}
								w='full'
								key={index}
								rounded='md'
								align='start'
								borderWidth={1}
								bg='bg.muted/60'
							>
								{question.type === 'short-text' ? (
									<Field gap={6} label={question.title}>
										<InputGroup w='full'>
											<Input
												w='full'
												size='xl'
												type='text'
												variant='flushed'
												placeholder='Sua resposta'
											/>
										</InputGroup>
									</Field>
								) : question.type === 'paragraph' ? (
									<Field gap={4} label={question.title}>
										<InputGroup w='full'>
											<Textarea
												w='full'
												size='xl'
												maxH={40}
												autoresize
												variant='flushed'
												placeholder='Sua resposta'
											/>
										</InputGroup>
									</Field>
								) : question.type === 'file-upload' ? (
									<Field gap={4} label={question.title}>
										<InputGroup w='full'>
											<Input
												w='full'
												size='xl'
												type='file'
												variant='flushed'
												placeholder='Sua resposta'
											/>
										</InputGroup>
									</Field>
								) : question.type === 'multiple-choice' ? (
									<Field gap={4} label={question.title}>
										<RadioGroup w='full'>
											<HStack gap={4}>
												{question.options?.map((option, optionIndex) => (
													<Radio key={optionIndex} value={option}>
														{option}
													</Radio>
												))}
											</HStack>
										</RadioGroup>
									</Field>
								) : question.type === 'checkbox' ? (
									<Fieldset.Root>
										<CheckboxGroup gap={6}>
											<Fieldset.Legend>{question.title}</Fieldset.Legend>

											<Fieldset.Content>
												{question.options?.map((option, optionIndex) => (
													<Checkbox key={optionIndex} value={option}>
														{option}
													</Checkbox>
												))}
											</Fieldset.Content>
										</CheckboxGroup>
									</Fieldset.Root>
								) : (
									question.type === 'dropdown' && (
										<Field gap={4} label={question.title}>
											<SelectRoot
												size='lg'
												collection={createListCollection({
													items: question.options?.map(option => ({
														label: option,
														value: option
													}))
												})}
											>
												<SelectTrigger>
													<SelectValueText placeholder='Selecionar uma opção' />
												</SelectTrigger>

												<SelectContent>
													{question.options?.map((option, optionIndex) => (
														<SelectItem key={optionIndex} item={option}>
															<Text
																gap={2}
																alignItems='center'
																display='inline-flex'
																justifyContent='center'
															>
																{option}
															</Text>
														</SelectItem>
													))}
												</SelectContent>
											</SelectRoot>
										</Field>
									)
								)}

								{question.mandatory && (
									<Text
										gap={1}
										fontSize='sm'
										color='red.solid'
										display='inline-flex'
									>
										<LuAsterisk />
										Pergunta obrigatória
									</Text>
								)}
							</VStack>
						)
					})}

					<Stack
						gap={4}
						w='full'
						justify='space-between'
						direction={['column', 'row']}
					>
						<Stack
							gap={[2, 4]}
							alignItems='center'
							direction={['column', 'row']}
						>
							<Button
								type='submit'
								w={['full', 'auto']}
								loading={loading}
								loadingText='Enviando'
							>
								Enviar
							</Button>
							<Text fontSize='sm' color='fg.muted'>
								{data.questions.length} perguntas encontradas
							</Text>
						</Stack>
						<Button
							type='button'
							variant='ghost'
							colorPalette='red'
							disabled={loading}
							w={['full', 'auto']}
						>
							Limpar formulário
						</Button>
					</Stack>
				</VStack>
			</Flex>
		</VStack>
	)
}
