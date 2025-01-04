import { z } from 'zod'
import { Link } from 'react-router'
import { FC, useState } from 'react'
import { SiGoogleforms } from 'react-icons/si'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuLockKeyhole, LuUser, LuMail } from 'react-icons/lu'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import {
	Text,
	Input,
	Float,
	HStack,
	VStack,
	Center,
	Heading,
	Link as ChakraLink
} from '@chakra-ui/react'

import { useAuth } from '../../hooks/use-auth'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import { ColorModeButton } from '@/components/ui/color-mode'
import { PasswordInput } from '@/components/ui/password-input'

const registerSchema = z
	.object({
		name: z.string().min(1, { message: 'Nome é obrigatório' }).trim(),
		email: z.string().email({ message: 'E-mail inválido' }).trim(),
		password: z.string().min(1, { message: 'Senha é obrigatória' }).trim(),
		confirmPassword: z
			.string()
			.min(1, { message: 'Senha é obrigatória' })
			.trim()
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Senhas não conferem',
		path: ['confirmPassword']
	})

type RegisterForm = z.infer<typeof registerSchema>

export const Register: FC = (): JSX.Element => {
	const { register: authRegister, loading } = useAuth()
	const [showPassword, setShowPassword] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema)
	})

	const handleRegister: SubmitHandler<FieldValues> = async values => {
		const { name, email, password } = values as RegisterForm

		await authRegister(email, password, name)
	}

	return (
		<Center minH='100vh' p={4}>
			<VStack
				py={8}
				w='full'
				px={[4, 8]}
				borderRadius='md'
				border='1px solid'
				position='relative'
				maxW='breakpoint-sm'
				borderColor='border'
			>
				<Float offset={6}>
					<ColorModeButton />
				</Float>

				<VStack>
					<HStack>
						<SiGoogleforms size={32} />
						<Heading fontSize='2xl' fontWeight='bold' lineHeight={1}>
							Forms
						</Heading>
					</HStack>
					<Text as='span' fontSize='sm' color='fg.muted' lineHeight={1}>
						rudneyrodrigues.dev.br
					</Text>
				</VStack>

				<VStack
					as='form'
					w='full'
					mt={8}
					spaceY={4}
					onSubmit={handleSubmit(handleRegister)}
				>
					<VStack w='full' align='start'>
						<Field invalid={!!errors.name} errorText={errors.name?.message}>
							<InputGroup w='full' startElement={<LuUser />}>
								<Input
									type='text'
									placeholder='Nome'
									{...register('name')}
									disabled={isSubmitting}
								/>
							</InputGroup>
						</Field>
						<Field invalid={!!errors.email} errorText={errors.email?.message}>
							<InputGroup w='full' startElement={<LuMail />}>
								<Input
									type='email'
									placeholder='E-mail'
									{...register('email')}
									disabled={isSubmitting}
								/>
							</InputGroup>
						</Field>
						<Field
							invalid={!!errors.password}
							errorText={errors.password?.message}
						>
							<InputGroup w='full' startElement={<LuLockKeyhole />}>
								<PasswordInput
									id='password'
									placeholder='Senha'
									visible={showPassword}
									disabled={isSubmitting}
									{...register('password')}
									onVisibleChange={setShowPassword}
								/>
							</InputGroup>
						</Field>
						<Field
							invalid={!!errors.confirmPassword}
							errorText={errors.confirmPassword?.message}
						>
							<InputGroup w='full' startElement={<LuLockKeyhole />}>
								<PasswordInput
									id='confirm-password'
									visible={showPassword}
									disabled={isSubmitting}
									placeholder='Confirmar senha'
									{...register('confirmPassword')}
									onVisibleChange={setShowPassword}
								/>
							</InputGroup>
						</Field>
					</VStack>

					<Button
						w='full'
						type='submit'
						loading={loading}
						loadingText='Registrando...'
					>
						Entrar
					</Button>
				</VStack>

				<VStack w='full' mt={8}>
					<Text fontSize='sm' color='fg.muted'>
						Já possui uma conta?{' '}
						<ChakraLink asChild>
							<Link to='/'>Entre aqui</Link>
						</ChakraLink>
					</Text>
				</VStack>
			</VStack>
		</Center>
	)
}
