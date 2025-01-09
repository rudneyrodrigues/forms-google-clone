import { FC } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router'
import { doc, setDoc } from 'firebase/firestore'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Group, Input, HStack, VStack, Separator } from '@chakra-ui/react'

import { db } from '@/service/firebase'
import { Field } from '@/components/ui/field'
import { formSchema } from '@/config/schemas'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { TypeQuestions, Form } from '@/config/types'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import { Questions } from '@/components/app/forms/questions'
import { FormActionBar } from '@/components/app/ActionBar/forms'

export const FormNew: FC = (): JSX.Element => {
	const { user } = useAuth()
	const navigate = useNavigate()
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
			title: 'Formulário sem título',
			questions: [
				{
					id: crypto.randomUUID(),
					title: 'Pergunta sem título',
					order: 1,
					mandatory: false,
					type: 'short-text',
					options: ['']
				}
			]
		}
	})

	const watchTitle = watch('title')
	const watchQuestions = watch('questions')

	const onSubmitForm: SubmitHandler<Form> = async values => {
		const { title, description, questions } = values

		console.log({ title, description, questions })

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
			await setDoc(doc(db, 'forms', crypto.randomUUID()), {
				title,
				description,
				// transforma as perguntas em um objeto onde a chave é o id da pergunta
				questions: questions.reduce<Record<string, Omit<TypeQuestions, 'id'>>>(
					(acc, question) => {
						acc[question.id] = { ...question, options: question.options ?? [] }
						return acc
					},
					{}
				),
				visibility: 'public',
				createdAt: new Date(),
				createdBy: user.uid
			})

			toaster.success({
				title: 'Formulário publicado',
				description: 'Seu formulário foi publicado com sucesso.',
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			})

			navigate('/dashboard')
		} catch (error) {
			console.error(error)

			toaster.error({
				title: 'Erro ao publicar formulário',
				description:
					'Ocorreu um erro ao tentar publicar o formulário. Tente novamente mais tarde.',
				action: {
					label: 'Entendi',
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
								loadingText='Publicando'
							>
								Publicar
							</Button>
						</HStack>
					</VStack>

					<FormActionBar
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
