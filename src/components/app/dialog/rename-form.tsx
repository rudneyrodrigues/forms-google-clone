import { Input } from '@chakra-ui/react'
import { doc, updateDoc } from 'firebase/firestore'
import { FC, memo, ReactNode, useState } from 'react'

import { db } from '@/service/firebase'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
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

interface DialogRenameFormProps {
	formId: string
	children: ReactNode
	defaultTitle: string
}

export const DialogRenameForm: FC<DialogRenameFormProps> = memo(
	({ formId, children, defaultTitle }: DialogRenameFormProps): JSX.Element => {
		const { mutate } = useGetAllForms()
		const [open, setOpen] = useState(false)
		const [loading, setLoading] = useState(false)
		const [title, setTitle] = useState(defaultTitle)

		const handleRenameForm = async () => {
			setLoading(true)

			try {
				const formRef = doc(db, 'forms', formId)

				await updateDoc(formRef, {
					title: title.trim()
				})

				toaster.success({
					description: 'Formulário renomeado com sucesso!',
					action: {
						label: 'Ok 😄',
						onClick: () => {}
					}
				})

				mutate()
				setOpen(false)
			} catch (error) {
				console.error(error)

				toaster.error({
					description: 'Ocorreu um erro ao tentar renomear o formulário.',
					action: {
						label: 'Ok 😢',
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
					if (!e.open) {
						setTitle(defaultTitle)
					}
				}}
			>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Renomear</DialogTitle>
					</DialogHeader>

					<DialogBody>
						<Field label='Insira um novo nome para o item:'>
							<InputGroup w='full'>
								<Input
									type='text'
									variant='subtle'
									value={title}
									placeholder={defaultTitle}
									onFocus={e => e.target.select()}
									onChange={e => setTitle(e.target.value)}
								/>
							</InputGroup>
						</Field>
					</DialogBody>

					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button variant='ghost'>Cancelar</Button>
						</DialogActionTrigger>

						<Button
							loading={loading}
							onClick={handleRenameForm}
							loadingText='Renomeando...'
							disabled={title.trim() === defaultTitle || title.length <= 2}
						>
							Renomear
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		)
	}
)
DialogRenameForm.displayName = 'DialogRenameForm'
