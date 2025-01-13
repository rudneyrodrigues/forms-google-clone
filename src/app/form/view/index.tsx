import { FC } from 'react'
import { useParams } from 'react-router'
import { LuAsterisk } from 'react-icons/lu'
import {
	Flex,
	Text,
	Input,
	VStack,
	HStack,
	Heading,
	Textarea,
	Fieldset,
	Separator,
	CheckboxGroup
} from '@chakra-ui/react'

import { ErrorPage } from '@/app/error'
import { LoadingPage } from '@/app/loading'
import { Field } from '@/components/ui/field'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup } from '@/components/ui/input-group'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { useGetFormById } from '@/hooks/swr/useGetFormById'
import { ProgressBar, ProgressRoot } from '@/components/ui/progress'

export const FormView: FC = (): JSX.Element => {
	const { id } = useParams() as { id: string }
	const { data, error, isLoading } = useGetFormById({ id })

	if (isLoading) {
		return <LoadingPage />
	}

	if (error || !data) {
		return <ErrorPage />
	}

	return (
		<VStack minH='100vh' w='full'>
			<Flex px={4} pt={4} pb={12} w='full'>
				<VStack
					gap={8}
					w='full'
					mx='auto'
					rounded='md'
					align='start'
					maxW='breakpoint-md'
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
							<Heading color='fg' fontSize='3xl' fontWeight='bold'>
								{data.title}
							</Heading>
							<Text color='fg.subtle' fontSize='sm'>
								{data.description}
							</Text>
						</VStack>

						<Separator />

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
						</HStack>
					</VStack>

					{data.presentations.showProgressBar && (
						<VStack
							px={4}
							py={8}
							gap={4}
							bg='bg'
							w='full'
							top={1}
							zIndex={1}
							rounded='md'
							align='start'
							borderWidth={1}
							position='sticky'
						>
							<ProgressRoot
								w='full'
								min={0}
								striped
								animated
								max={100}
								value={10}
							>
								<ProgressBar />
							</ProgressRoot>
						</VStack>
					)}

					<Separator />

					{data.questions.map((question, index) => {
						return (
							<>
								{question.type === 'short-text' && (
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
								)}

								{question.type === 'paragraph' && (
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
								)}

								{question.type === 'file-upload' && (
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
								)}

								{question.type === 'multiple-choice' && (
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
								)}

								{question.type === 'checkbox' && (
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
								)}
							</>
						)
					})}
				</VStack>
			</Flex>
		</VStack>
	)
}
