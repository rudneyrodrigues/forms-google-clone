import { useNavigate } from 'react-router'
import { FC, memo, ReactNode, useState } from 'react'
import { Input, Mark, Text, VStack } from '@chakra-ui/react'

import { db } from '@/service/firebase'
import { Field } from '@/components/ui/field'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { deleteDoc, doc } from 'firebase/firestore'
import { InputGroup } from '@/components/ui/input-group'
import { useGetAllForms } from '@/hooks/swr/useGetAllForms'
import {
	DialogBody,
	DialogRoot,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogContent,
	DialogTrigger,
	DialogActionTrigger
} from '@/components/ui/dialog'
import { Tooltip } from '@/components/ui/tooltip'

interface DialogDeleteFormProps {
	title: string
	formId: string
	children: ReactNode
}

export const DialogDeleteForm: FC<DialogDeleteFormProps> = memo(
	({ title, formId, children }: DialogDeleteFormProps): JSX.Element => {
		const navigate = useNavigate()
		const { mutate } = useGetAllForms()
		const [text, setText] = useState('')
		const [open, setOpen] = useState(false)
		const [loading, setLoading] = useState(false)

		const handleDeleteForm = async () => {
			setLoading(true)

			try {
				await deleteDoc(doc(db, 'forms', formId))

				toaster.success({
					description: 'Formulário deletado com sucesso!',
					action: {
						label: 'Ok 😄',
						onClick: () => {}
					}
				})

				navigate('/dashboard')

				mutate()
				setOpen(false)
			} catch (error) {
				console.error(error)

				toaster.error({
					description: 'Ocorreu um erro ao tentar deletar o formulário.',
					action: {
						label: 'Ok 😞',
						onClick: () => {}
					}
				})
			} finally {
				setLoading(false)
			}
		}

		return (
			<DialogRoot
				lazyMount
				open={open}
				placement='center'
				motionPreset='scale'
				onOpenChange={e => {
					setOpen(e.open)
					setText('')
				}}
			>
				<Tooltip content='Deletar formulário'>
					<DialogTrigger asChild>{children}</DialogTrigger>
				</Tooltip>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Excluir</DialogTitle>
					</DialogHeader>

					<DialogBody>
						<VStack gap={4} w='full' align='start'>
							<Text fontSize='md'>
								Você está prestes a excluir o formulário{' '}
								<Mark variant='subtle'>{title}</Mark>.
							</Text>

							<Text fontSize='md'>
								Essa ação é irreversível. Todos os dados relacionados a este
								formulário serão perdidos.
							</Text>

							<Alert
								status='error'
								title='Esta ação não é reversível. Por favor, tenha certeza.'
							/>
						</VStack>

						<VStack w='full' align='start' mt={8}>
							<Text>
								Para deletar, digite{' '}
								<Mark variant='subtle' color='fg.error'>
									{title}
								</Mark>{' '}
								abaixo:
							</Text>
							<Field>
								<InputGroup w='full'>
									<Input
										type='text'
										value={text}
										variant='subtle'
										placeholder={title}
										onChange={e => setText(e.target.value)}
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
							loading={loading}
							colorPalette='red'
							onClick={handleDeleteForm}
							loadingText='Deletando...'
							disabled={text.trim() !== title || text.length <= 2}
						>
							Deletar
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		)
	}
)
DialogDeleteForm.displayName = 'DialogDeleteForm'
