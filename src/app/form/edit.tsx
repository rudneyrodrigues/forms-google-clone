import { FC } from 'react'
import { LuPlus } from 'react-icons/lu'
import { useParams } from 'react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Group, Input, Separator, Text, VStack } from '@chakra-ui/react'

import { Form } from '@/config/types'
import { Alert } from '@/components/ui/alert'
import { Field } from '@/components/ui/field'
import { formSchema } from '@/config/schemas'
import { Button } from '@/components/ui/button'
import { addQuestion } from '@/utils/add-question'
import { Skeleton } from '@/components/ui/skeleton'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import { useGetFormById } from '@/hooks/swr/useGetFormById'
import {
	ActionBarRoot,
	ActionBarContent,
	ActionBarSeparator
} from '@/components/ui/action-bar'

export const FormEdit: FC = (): JSX.Element => {
	const { id } = useParams() as { id: string }
	const { data, error, isLoading } = useGetFormById({ id })
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
			title: data?.title || 'Formulário sem título',
			questions: data?.questions || [
				{
					id: '1',
					title: 'Pergunta sem título',
					mandatory: false,
					type: 'short-text',
					options: ['']
				}
			]
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

	if (error || !data) {
		return (
			<VStack minH='100vh' w='full'>
				<HeaderAuth />

				<Flex px={4} pt={4} pb={8} flex={1} w='full'>
					<VStack w='full' mx='auto' maxW='breakpoint-md'>
						<Alert
							status='error'
							title='Ocorreu um erro ao carregar as informações do formulário'
						/>
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

			<Flex px={4} pt={4} pb={8} flex={1} w='full'>
				<VStack
					as='form'
					w='full'
					mx='auto'
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

					<VStack w='full' mb={14} align='start' spaceY={6}></VStack>

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
