import { Input } from '@chakra-ui/react'
import { FC, memo, ReactNode, useState } from 'react'

import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
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
	children: ReactNode
	defaultTitle: string
}

export const DialogRenameForm: FC<DialogRenameFormProps> = memo(
	({ children, defaultTitle }: DialogRenameFormProps): JSX.Element => {
		const [title, setTitle] = useState(defaultTitle)

		return (
			<DialogRoot placement='center' motionPreset='scale'>
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
