import { z } from 'zod'
import { Link } from 'react-router'
import { FC, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiGoogleforms } from 'react-icons/si'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuLockKeyhole, LuMail } from 'react-icons/lu'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import {
	Text,
	Input,
	Float,
	HStack,
	VStack,
	Center,
	Heading,
	Separator,
	Link as ChakraLink
} from '@chakra-ui/react'

import { useAuth } from '../../hooks/use-auth'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import { ColorModeButton } from '@/components/ui/color-mode'
import { PasswordInput } from '@/components/ui/password-input'

const loginSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido' }).trim(),
	password: z.string().min(1, { message: 'Senha é obrigatória' }).trim()
})

type LoginForm = z.infer<typeof loginSchema>

export const Login: FC = (): JSX.Element => {
	const { login, loading, loginWithGoogle } = useAuth()
	const [showPassword, setShowPassword] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema)
	})

	const handleLogin: SubmitHandler<FieldValues> = async values => {
		const { email, password } = values as LoginForm

		await login(email, password)
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
					onSubmit={handleSubmit(handleLogin)}
				>
					<VStack w='full' align='start'>
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
									placeholder='Senha'
									visible={showPassword}
									disabled={isSubmitting}
									{...register('password')}
									onVisibleChange={setShowPassword}
								/>
							</InputGroup>
						</Field>

						<Text fontSize='sm' color='fg.muted'>
							Não possui uma conta?{' '}
							<ChakraLink asChild>
								<Link to='/register'>Inscreva-se</Link>
							</ChakraLink>
						</Text>
					</VStack>

					<Button
						w='full'
						type='submit'
						loading={loading}
						loadingText='Entrando...'
					>
						Entrar
					</Button>
				</VStack>

				<HStack my={8} w='full'>
					<Separator />
					<Text
						as='span'
						fontSize='xs'
						flexShrink='0'
						color='fg.muted'
						fontWeight='bold'
						textTransform='uppercase'
					>
						Ou entre com
					</Text>
					<Separator />
				</HStack>

				<Button
					w='full'
					variant='outline'
					loading={loading}
					loadingText='Entrando...'
					onClick={loginWithGoogle}
				>
					<FcGoogle />
					Google
				</Button>
			</VStack>
		</Center>
	)
}
