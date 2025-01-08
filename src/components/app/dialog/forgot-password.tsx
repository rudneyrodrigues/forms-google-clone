import { z } from 'zod'
import { LuMail } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, memo, ReactNode, useState } from 'react'
import { Input, Text, VStack } from '@chakra-ui/react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'

import { useAuth } from '@/hooks/use-auth'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import {
	DialogBody,
	DialogRoot,
	DialogTitle,
	DialogFooter,
	DialogHeader,
	DialogContent,
	DialogTrigger,
	DialogActionTrigger
} from '@/components/ui/dialog'

const forgotPasswordSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido' }).trim()
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

interface DialogForgotPasswordProps {
	children: ReactNode
}

export const DialogForgotPassword: FC<DialogForgotPasswordProps> = memo(
	({ children }: DialogForgotPasswordProps): JSX.Element => {
		const { forgotPassword } = useAuth()
		const [open, setOpen] = useState(false)
		const {
			register,
			setValue,
			handleSubmit,
			formState: { errors, isSubmitting }
		} = useForm<ForgotPasswordForm>({
			resolver: zodResolver(forgotPasswordSchema)
		})

		const handleForgotPassword: SubmitHandler<FieldValues> = async values => {
			await forgotPassword(values.email)

			setValue('email', '')
			setOpen(false)
		}

		return (
			<DialogRoot
				lazyMount
				open={open}
				placement='center'
				motionPreset='scale'
				onOpenChange={e => {
					setOpen(e.open)
					setValue('email', '')
					errors.email = undefined
				}}
			>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Esqueceu sua senha?</DialogTitle>
					</DialogHeader>

					<DialogBody>
						<VStack gap={4} w='full' align='start'>
							<Text>
								Insira seu e-mail abaixo e enviaremos um link para você
								redefinir sua senha.
							</Text>
						</VStack>

						<VStack mt={8} gap={4} w='full' align='start'>
							<Field invalid={!!errors.email} errorText={errors.email?.message}>
								<InputGroup w='full' startElement={<LuMail />}>
									<Input
										type='email'
										variant='subtle'
										placeholder='E-mail'
										{...register('email')}
										disabled={isSubmitting}
									/>
								</InputGroup>
							</Field>
						</VStack>
					</DialogBody>

					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button variant='ghost'>Cancelar</Button>
						</DialogActionTrigger>

						<Button
							loading={isSubmitting}
							loadingText='Enviando e-mail...'
							onClick={handleSubmit(handleForgotPassword)}
						>
							Enviar e-mail
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		)
	}
)
DialogForgotPassword.displayName = 'DialogForgotPassword'
