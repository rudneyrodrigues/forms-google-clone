import { FC } from 'react'
import { LuPlus } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoaderData, useNavigation } from 'react-router'
import {
	Flex,
	Text,
	Group,
	Input,
	HStack,
	VStack,
	Separator
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
			title: data.title,
			questions: data.questions
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
					w='full'
					mx='auto'
					as='form'
					maxW='breakpoint-md'
					onSubmit={handleSubmit(onSubmitForm)}
				>
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

					<VStack w='full' mb={14} align='start' spaceY={6}>
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

						<HStack w='full' justify='end'>
							<Button
								size='sm'
								type='submit'
								w={['full', 'auto']}
								loading={isSubmitting}
								loadingText='Atualizando'
							>
								Atualizar formulário
							</Button>
						</HStack>
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
