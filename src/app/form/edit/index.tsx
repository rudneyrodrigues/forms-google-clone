import { FC } from 'react'
import { LuEye, LuPlus, LuTrash } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLoaderData, useNavigation } from 'react-router'
import {
	Flex,
	Group,
	Input,
	HStack,
	VStack,
	Separator,
	ClipboardRoot,
	IconButton,
	Tooltip
} from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { formSchema } from '@/config/schemas'
import { Button } from '@/components/ui/button'
import { addQuestion } from '@/utils/add-question'
import { Skeleton } from '@/components/ui/skeleton'
import { Form, FormDataEdit } from '@/config/types'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import { Questions } from '@/components/app/forms/questions'
import {
	ActionBarRoot,
	ActionBarContent,
	ActionBarSeparator
} from '@/components/ui/action-bar'
import { DialogDeleteForm } from '@/components/app/dialog/delete-form'
import { ClipboardIconButton } from '@/components/ui/clipboard'
import { MdShare } from 'react-icons/md'

export const FormEdit: FC = (): JSX.Element => {
	const navigation = useNavigation()
	const data = useLoaderData() as FormDataEdit
	const isLoading = navigation.state === 'loading'
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
			...data
		}
	})

	const watchTitle = watch('title')
	const watchQuestions = watch('questions')

	if (isLoading) {
		return (
			<VStack minH='100vh' w='full'>
				<HeaderAuth />

				<Flex px={4} pt={4} pb={8} flex={1} w='full'>
					<VStack w='full' mx='auto' maxW='breakpoint-md'>
						{new Array(3).fill(0).map((_, index) => (
							<Skeleton key={index} height={60} w='full' />
						))}
					</VStack>
				</Flex>
			</VStack>
		)
	}

	const onSubmitForm: SubmitHandler<Form> = async values => {
		const { title, description, questions } = values

		console.log({ title, description, questions })
	}

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth title={watchTitle} />

			<Flex px={4} pt={4} pb={12} flex={1} w='full'>
				<VStack
					pb={16}
					w='full'
					mx='auto'
					as='form'
					maxW='breakpoint-md'
					onSubmit={handleSubmit(onSubmitForm)}
				>
					<HStack mb={8} w='full' justify='end'>
						<Tooltip content='Visualizar formulário'>
							<IconButton variant='ghost' asChild>
								<Link to={`/form/${data.id}/preview`} target='_blank'>
									<LuEye />
								</Link>
							</IconButton>
						</Tooltip>

						<ClipboardRoot
							value={`${window.location.origin}/form/${data.id}/share`}
						>
							<Tooltip content='Link de compartilhamento'>
								<ClipboardIconButton size='md' variant='ghost' icon={MdShare} />
							</Tooltip>
						</ClipboardRoot>

						<DialogDeleteForm formId={data.id} title={watchTitle}>
							<IconButton variant='ghost'>
								<LuTrash />
							</IconButton>
						</DialogDeleteForm>
					</HStack>

					<Group
						w='full'
						p={[4, 8]}
						rounded='md'
						flexDir='column'
						border='1px dashed'
						borderColor='border'
						animation='fade-in 300ms ease-in-out'
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

					<VStack w='full' align='start' spaceY={6}>
						{watchQuestions.map((question, index) => (
							<Questions
								index={index}
								errors={errors}
								key={question.id}
								question={question}
								register={register}
								setValue={setValue}
								getValues={getValues}
								watchQuestions={watchQuestions}
							/>
						))}
					</VStack>

					<ActionBarRoot open={true}>
						<ActionBarContent>
							<Button
								size='sm'
								variant='ghost'
								disabled={isSubmitting}
								onClick={() =>
									addQuestion({ setValue, getValues, type: 'short-text' })
								}
							>
								<LuPlus />
								Adicionar
							</Button>

							<ActionBarSeparator />

							<Text color='fg.muted' fontSize='xs'>
								{watchQuestions.length}{' '}
								{watchQuestions.length === 1 ? 'pergunta' : 'perguntas'}
							</Text>
						</ActionBarContent>
					</ActionBarRoot>
				</VStack>
			</Flex>
		</VStack>
	)
}
