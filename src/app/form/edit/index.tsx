import { FC } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoaderData, useNavigation } from 'react-router'
import { Flex, Group, Input, HStack, VStack, Separator } from '@chakra-ui/react'

import { db } from '@/service/firebase'
import { Field } from '@/components/ui/field'
import { formSchema } from '@/config/schemas'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { Skeleton } from '@/components/ui/skeleton'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import { Questions } from '@/components/app/forms/questions'
import { FormActionBar } from '@/components/app/ActionBar/forms'
import { Form, FormDataEdit, TypeQuestions } from '@/config/types'

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
			description: data.description,
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

		const hasInvalidOptions = questions.some(
			question =>
				['multiple-choice', 'dropdown', 'checkbox'].includes(question.type) &&
				(question.options?.length ?? 0) < 2
		)

		if (hasInvalidOptions) {
			toaster.error({
				title: 'Erro ao publicar formulário',
				description:
					'Perguntas do tipo "Múltipla escolha", "Caixa de seleção" ou "Dropdown" devem ter no mínimo 2 opções.',
				action: {
					label: 'Entendi',
					onClick: () => {}
				}
			})
			return
		}

		try {
			const formRef = doc(db, 'forms', data.id)

			await updateDoc(formRef, {
				title: title.trim(),
				description,
				questions: questions.reduce<Record<string, Omit<TypeQuestions, 'id'>>>(
					(acc, question) => {
						acc[question.id] = { ...question, options: question.options ?? [] }
						return acc
					},
					{}
				),
				updatedAt: new Date()
			})

			toaster.success({
				title: 'Formulário atualizado',
				description: 'Seu formulário foi atualizado com sucesso.',
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			})
		} catch (error) {
			console.error(error)

			toaster.error({
				title: 'Erro ao atualizar formulário',
				description: 'Ocorreu um erro ao tentar atualizar o formulário.',
				action: {
					label: 'Ok 😢',
					onClick: () => {}
				}
			})
		}
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

					<FormActionBar
						formId={data.id}
						setValue={setValue}
						getValues={getValues}
						isSubmitting={isSubmitting}
						watchQuestions={watchQuestions}
					/>
				</VStack>
			</Flex>
		</VStack>
	)
}
