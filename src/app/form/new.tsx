import { z } from 'zod'
import { FC } from 'react'
import { Form } from 'react-router'
import { LuPlus, LuTrash } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Flex,
	Text,
	Stack,
	Group,
	Input,
	HStack,
	VStack,
	Separator,
	IconButton
} from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { formSelectType } from '@/config/site'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Questions, TypeQuestion } from '@/config/types'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import {
	ActionBarContent,
	ActionBarRoot,
	ActionBarSeparator
} from '@/components/ui/action-bar'
import {
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectContent,
	SelectValueText
} from '@/components/ui/select'

const formSchema = z
	.object({
		title: z.string().min(1, { message: 'Título é obrigatório' }).trim(),
		description: z.string().trim(),
		questions: z.array(
			z.object({
				id: z.string().uuid(),
				title: z.string().min(1, { message: 'Pergunta é obrigatória' }).trim(),
				mandatory: z.boolean(),
				type: z.enum([
					'short-text',
					'paragraph',
					'multiple-choice',
					'checkbox',
					'dropdown',
					'file-upload'
				]),
				question: z
					.string()
					.min(1, { message: 'O tipo da pergunta é obrigatório' })
					.trim(),
				options: z.array(z.string()).optional()
			})
		)
	})
	.refine(data => data.questions.length > 0, {
		message: 'Formulário precisa ter pelo menos uma pergunta',
		path: ['questions']
	})

type Form = z.infer<typeof formSchema>

export const FormNew: FC = (): JSX.Element => {
	const {
		watch,
		register,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<Form>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			questions: [
				{
					id: crypto.randomUUID(),
					title: '',
					mandatory: false,
					type: 'short-text',
					question: '',
					options: ['']
				}
			]
		}
	})

	const watchQuestions = watch('questions')

	const addQuestion = (type: TypeQuestion) => {
		const newQuestion = {
			id: crypto.randomUUID(),
			title: '',
			mandatory: false,
			type,
			question: '',
			options: ['']
		}

		const currentQuestions = getValues('questions') as Questions[]
		setValue('questions', [...currentQuestions, newQuestion], {
			shouldDirty: true
		})
	}

	const removeQuestion = (id: string) => {
		const currentQuestions = getValues('questions') as Questions[]

		setValue(
			'questions',
			currentQuestions.filter(question => question.id !== id),
			{
				shouldDirty: true
			}
		)
	}

	const onSubmit: SubmitHandler<Form> = async values => {
		console.log(values)
	}

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={8} flex={1} w='full'>
				<VStack
					as='form'
					w='full'
					mx='auto'
					maxW='breakpoint-md'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Group
						p={[4, 8]}
						w='full'
						rounded='md'
						flexDir='column'
						border='1px dashed'
						borderColor='border'
					>
						<Field
							w='full'
							invalid={!!errors.title}
							errorText={errors.title?.message}
						>
							<InputGroup w='full'>
								<Input
									w='full'
									size='xl'
									type='text'
									fontSize='2xl'
									variant='flushed'
									{...register('title')}
									disabled={isSubmitting}
									placeholder='Título do formulário'
								/>
							</InputGroup>
						</Field>
						<Field
							w='full'
							invalid={!!errors.description}
							errorText={errors.description?.message}
						>
							<InputGroup w='full'>
								<Input
									w='full'
									type='text'
									variant='flushed'
									disabled={isSubmitting}
									{...register('description')}
									placeholder='Descrição do formulário'
								/>
							</InputGroup>
						</Field>
					</Group>

					<Separator my={8} variant='dashed' />

					<VStack w='full' mb={14} align='start' spaceY={6}>
						{watchQuestions.map((question, index) => (
							<VStack
								w='full'
								p={4}
								key={index}
								rounded='md'
								border='1px solid'
								borderColor='border'
							>
								<Stack
									mb={4}
									w='full'
									justify='space-between'
									direction={['column', 'row']}
								>
									<Field
										w='full'
										invalid={!!errors.title}
										errorText={errors.title?.message}
									>
										<InputGroup w='full'>
											<Input
												w='full'
												size='lg'
												type='text'
												variant='flushed'
												placeholder={`Titulo da ${index + 1}ª pergunta`}
												{...register(`questions.${index}.title` as const)}
											/>
										</InputGroup>
									</Field>

									<Field
										width={['full', '20rem']}
										invalid={!!errors.questions?.[index]?.type}
									>
										<SelectRoot
											size='lg'
											collection={formSelectType}
											defaultValue={[question.type]}
											{...register(`questions.${index}.type` as const)}
											onValueChange={e => {
												setValue(
													`questions.${index}.type`,
													e.value as unknown as TypeQuestion
												)
											}}
										>
											<SelectTrigger>
												<SelectValueText placeholder='Selecionar tipo' />
											</SelectTrigger>

											<SelectContent>
												{formSelectType.items.map((type, index) => (
													<SelectItem key={index} item={type.value}>
														{type.label}
													</SelectItem>
												))}
											</SelectContent>
										</SelectRoot>
									</Field>
								</Stack>

								{question.type === 'short-text' && (
									<Input
										w='full'
										disabled
										variant='flushed'
										placeholder='Texto da resposta curta'
									/>
								)}

								{question.type === 'paragraph' && (
									<Input
										w='full'
										disabled
										variant='flushed'
										placeholder='Texto da resposta longa'
									/>
								)}

								{(question.type === 'multiple-choice' ||
									question.type === 'checkbox' ||
									question.type === 'dropdown') && (
									<VStack w='full' align='start' spaceY={4}>
										{question.options?.map((option, optionIndex) => (
											<HStack w='full' key={optionIndex}>
												<Input
													w='full'
													value={option}
													variant='flushed'
													placeholder='Opção'
													onChange={e => {
														const updateOptions = [...watchQuestions]
														updateOptions[index].options![optionIndex] =
															e.target.value
														setValue(
															`questions.${index}.options`,
															updateOptions[index].options
														)
													}}
												/>
												<IconButton
													size='sm'
													variant='ghost'
													disabled={question.options?.length === 1}
													onClick={() => {
														const updateOptions = [...watchQuestions]

														updateOptions[index].options =
															question.options?.filter(
																(_, i) => i !== optionIndex
															)

														setValue('questions', updateOptions, {
															shouldDirty: true
														})
													}}
												>
													<LuTrash />
												</IconButton>
											</HStack>
										))}

										<Button
											size='sm'
											variant='ghost'
											onClick={() => {
												const updateOptions = [...(question.options || []), '']
												setValue(`questions.${index}.options`, updateOptions)
											}}
										>
											Adicionar opção
										</Button>
									</VStack>
								)}

								<HStack w='full' mt={4} justify='end'>
									<IconButton
										size='sm'
										variant='ghost'
										disabled={watchQuestions.length === 1}
										onClick={() => removeQuestion(question.id)}
									>
										<LuTrash />
									</IconButton>

									<Separator height={4} orientation='vertical' />

									<Switch
										checked={question.mandatory}
										onCheckedChange={e => {
											setValue(`questions.${index}.mandatory`, e.checked)
										}}
									>
										Obrigatória
									</Switch>
								</HStack>
							</VStack>
						))}
					</VStack>
				</VStack>
			</Flex>

			<ActionBarRoot open={true}>
				<ActionBarContent>
					<Button
						size='sm'
						variant='ghost'
						onClick={() => addQuestion('short-text')}
					>
						<LuPlus />
						Adicionar
					</Button>

					<ActionBarSeparator />

					<Text color='fg.muted' fontSize='xs'>
						{watchQuestions.length} perguntas
					</Text>
				</ActionBarContent>
			</ActionBarRoot>
		</VStack>
	)
}
