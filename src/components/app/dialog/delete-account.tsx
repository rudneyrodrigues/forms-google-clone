import { deleteUser } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { FC, memo, ReactNode, useState } from 'react'
import { Input, Mark, Text, VStack } from '@chakra-ui/react'
import {
	doc,
	where,
	query,
	getDocs,
	deleteDoc,
	collection
} from 'firebase/firestore'

import { db } from '@/service/firebase'
import { useAuth } from '@/hooks/use-auth'
import { Alert } from '@/components/ui/alert'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
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

interface DialogDeleteAccountProps {
	children: ReactNode
}

export const DialogDeleteAccount: FC<DialogDeleteAccountProps> = memo(
	({ children }: DialogDeleteAccountProps): JSX.Element => {
		const { user } = useAuth()
		const navigate = useNavigate()
		const [text, setText] = useState('')
		const [isLoading, setIsLoading] = useState(false)

		const handleDeleteAccount = async () => {
			setIsLoading(true)

			try {
				const q = query(
					collection(db, 'forms'),
					where('createdBy', '==', user.uid)
				)

				const querySnapshot = await getDocs(q)

				const deleteForms = querySnapshot.docs.map(docSnapshot =>
					deleteDoc(doc(db, 'forms', docSnapshot.id))
				)

				await Promise.all(deleteForms)

				await deleteUser(user)

				toaster.success({
					description: 'Sua conta foi deletada com sucesso.',
					type: 'success'
				})

				navigate('/')
			} catch (error) {
				console.log(error)

				toaster.error({
					description:
						'Ocorreu um erro ao deletar sua conta. Por favor, tente novamente.',
					type: 'error'
				})
			} finally {
				setIsLoading(false)
			}
		}

		return (
			<DialogRoot placement='center' motionPreset='scale'>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Deletar conta</DialogTitle>
					</DialogHeader>

					<DialogBody>
						<VStack gap={4} w='full' align='start'>
							<Text fontSize='md'>
								O Forms{' '}
								<Mark variant='subtle'>excluíra todos os seus formulários</Mark>{' '}
								e dados permanentemente. Esta ação não pode ser desfeita.
							</Text>

							<Text fontSize='md'>
								Recomendamos que você faça o download de todos os seus dados
								antes de prosseguir.
							</Text>

							<Alert
								status='error'
								title='Esta ação não é reversível. Por favor, tenha certeza.'
							/>
						</VStack>

						<VStack w='full' align='start' mt={8}>
							<Text>
								Para verificar, digite{' '}
								<Mark variant='subtle' color='fg.error'>
									Deletar minha conta pessoal
								</Mark>{' '}
								abaixo:
							</Text>
							<Field>
								<InputGroup w='full'>
									<Input
										type='text'
										value={text}
										variant='subtle'
										onChange={e => setText(e.target.value)}
										placeholder='Deletar minha conta pessoal'
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
							colorPalette='red'
							loading={isLoading}
							loadingText='Deletando'
							onClick={handleDeleteAccount}
							disabled={
								!text ||
								text.trim().toLowerCase() !== 'deletar minha conta pessoal'
							}
						>
							Deletar conta
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		)
	}
)
DialogDeleteAccount.displayName = 'DialogDeleteAccount'
