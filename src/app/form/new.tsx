import { FC } from 'react'
import { LuPlus } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
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
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import { Questions } from '@/components/app/forms/questions'
import { TypeQuestions, TypeOfQuestion, Form } from '@/config/types'
import {
	ActionBarRoot,
	ActionBarContent,
	ActionBarSeparator
} from '@/components/ui/action-bar'

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
			title: 'Formulário sem título',
			questions: [
				{
					id: crypto.randomUUID(),
					title: 'Pergunta sem título',
					mandatory: false,
					type: 'short-text',
					options: ['']
				}
			]
		}
	})

	const watchQuestions = watch('questions')

	const addQuestion = (type: TypeOfQuestion) => {
		const newQuestion = {
			id: crypto.randomUUID(),
			title: 'Pergunta sem título',
			mandatory: false,
			type,
			options: ['']
		}

		const currentQuestions = getValues('questions') as TypeQuestions[]
		setValue('questions', [...currentQuestions, newQuestion], {
			shouldDirty: true
		})
	}

	const removeQuestion = (id: string) => {
		const currentQuestions = getValues('questions') as TypeQuestions[]

		setValue(
			'questions',
			currentQuestions.filter(question => question.id !== id),
			{
				shouldDirty: true
			}
		)
	}

	const onSubmitForm: SubmitHandler<Form> = async values => {
		const { title, description, questions } = values

		console.log({ title, description })

		// Se houver alguma questão do tipo 'multiple-choice', 'dropdown' ou 'checkbox' com menos de 2 opções
		// o formulário não será enviado e um alerta será exibido
		const hasInvalidOptions = questions.some(
			question =>
				['multiple-choice', 'dropdown', 'checkbox'].includes(question.type) &&
				(question.options?.length ?? 0) < 2
		)

		if (hasInvalidOptions) {
			alert('Questões do tipo múltipla escolha devem ter no mínimo 2 opções')
			return
		}
	}

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={8} flex={1} w='full'>
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
								setValue={setValue}
								question={question}
								register={register}
								watchQuestions={watchQuestions}
								removeQuestion={removeQuestion}
							/>
						))}

						<HStack w='full' justify='end'>
							<Button
								size='sm'
								type='submit'
								loading={isSubmitting}
								loadingText='Publicando'
							>
								Publicar
							</Button>
						</HStack>
					</VStack>

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
