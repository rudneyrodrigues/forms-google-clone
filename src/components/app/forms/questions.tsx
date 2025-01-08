import { FC, memo } from 'react'
import { LuTrash } from 'react-icons/lu'
import { MdCheckBoxOutlineBlank, MdRadioButtonUnchecked } from 'react-icons/md'
import {
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	UseFormGetValues
} from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { formSelectType } from '@/config/site'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Form, TypeOfQuestion } from '@/config/types'
import { InputGroup } from '@/components/ui/input-group'
import { removeQuestion } from '@/utils/remove-question'
import {
	SelectItem,
	SelectRoot,
	SelectContent,
	SelectTrigger,
	SelectValueText
} from '@/components/ui/select'
import {
	Text,
	Input,
	Stack,
	Float,
	Circle,
	VStack,
	HStack,
	Separator,
	IconButton
} from '@chakra-ui/react'

type QuestionsProps = {
	index: number
	question: {
		title: string
		id: string
		type: TypeOfQuestion
		mandatory: boolean
		options?: string[] | undefined
	}
	errors: FieldErrors<Form>
	register: UseFormRegister<Form>
	setValue: UseFormSetValue<Form>
	getValues: UseFormGetValues<Form>
	watchQuestions: {
		title: string
		id: string
		type: TypeOfQuestion
		mandatory: boolean
		options?: string[] | undefined
	}[]
}

export const Questions: FC<QuestionsProps> = memo(
	({
		index,
		errors,
		question,
		register,
		setValue,
		getValues,
		watchQuestions
	}: QuestionsProps): JSX.Element => {
		return (
			<VStack
				p={4}
				w='full'
				key={index}
				rounded='md'
				border='1px solid'
				position='relative'
				borderColor='border'
				animation='fade-in 300ms ease-in-out'
			>
				<Float placement='top-start'>
					<Circle size={6} borderWidth={1} bg='bg.muted' color='fg.muted'>
						{index + 1}
					</Circle>
				</Float>

				<Stack
					mb={4}
					w='full'
					justify='space-between'
					direction={['column', 'row']}
				>
					<Field
						w='full'
						invalid={!!errors.questions?.[index]?.title}
						errorText={errors.questions?.[index]?.title?.message}
					>
						<InputGroup w='full'>
							<Input
								w='full'
								size='xl'
								type='text'
								variant='flushed'
								autoFocus={index === watchQuestions.length - 1}
								placeholder={`Titulo da ${index + 1}ª pergunta`}
								{...register(`questions.${index}.title` as const)}
							/>
						</InputGroup>
					</Field>

					<Field
						width={['full', '24rem']}
						invalid={!!errors.questions?.[index]?.type}
					>
						<SelectRoot
							size='lg'
							collection={formSelectType}
							defaultValue={[question.type]}
							{...register(`questions.${index}.type` as const)}
							onValueChange={e => {
								const type = e.value as unknown as TypeOfQuestion

								if (type.includes('short-text') || type.includes('paragraph')) {
									setValue(`questions.${index}.options`, [''], {
										shouldDirty: true,
										shouldValidate: true
									})
								}

								setValue(`questions.${index}.type`, type)
							}}
						>
							<SelectTrigger>
								<SelectValueText
									gap={2}
									display='flex'
									placeholder='Selecionar tipo'
								>
									{items => {
										const selected = items.find(
											item => item.value === question.type
										)

										return (
											<>
												{selected?.icon}
												{selected?.label}
											</>
										)
									}}
								</SelectValueText>
							</SelectTrigger>

							<SelectContent>
								{formSelectType.items.map((type, index) => (
									<SelectItem key={index} item={type.value}>
										<Text
											gap={2}
											alignItems='center'
											display='inline-flex'
											justifyContent='center'
										>
											{type.icon}
											{type.label}
										</Text>
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
								{question.type === 'multiple-choice' && (
									<MdRadioButtonUnchecked size={24} />
								)}
								{question.type === 'checkbox' && (
									<MdCheckBoxOutlineBlank size={24} />
								)}
								{question.type === 'dropdown' && (
									<Text fontSize='sm'>{optionIndex + 1}.</Text>
								)}
								<Input
									w='full'
									size='xl'
									value={option}
									variant='flushed'
									placeholder='Opção'
									onChange={e => {
										const updateOptions = [...watchQuestions]
										updateOptions[index].options![optionIndex] = e.target.value
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

										updateOptions[index].options = question.options?.filter(
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
						onClick={() =>
							removeQuestion({
								setValue,
								getValues,
								id: question.id
							})
						}
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
		)
	}
)
Questions.displayName = 'Questions'
