import { FC, memo } from 'react'
import { IconButton } from '@chakra-ui/react'
import { LuImage, LuPlus } from 'react-icons/lu'
import {
	SubmitHandler,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormSetValue
} from 'react-hook-form'

import { Form } from '@/config/types'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { addQuestion } from '@/utils/add-question'
import {
	ActionBarRoot,
	ActionBarContent,
	ActionBarSeparator
} from '@/components/ui/action-bar'

interface FormActionBarProps {
	isSubmitting: boolean
	setValue: UseFormSetValue<Form>
	getValues: UseFormGetValues<Form>
	onSubmitForm: SubmitHandler<Form>
	handleSubmit: UseFormHandleSubmit<Form, undefined>
}

const FormActionBarComponent: FC<FormActionBarProps> = ({
	setValue,
	getValues,
	isSubmitting,
	onSubmitForm,
	handleSubmit
}: FormActionBarProps): JSX.Element => {
	return (
		<ActionBarRoot open={true}>
			<ActionBarContent>
				<Tooltip content='Adicionar pergunta'>
					<IconButton
						variant='ghost'
						disabled={isSubmitting}
						onClick={() =>
							addQuestion({ setValue, getValues, type: 'short-text' })
						}
					>
						<LuPlus />
					</IconButton>
				</Tooltip>
				<Tooltip content='Adicionar banner'>
					<IconButton variant='ghost' disabled={isSubmitting}>
						<LuImage />
					</IconButton>
				</Tooltip>

				<ActionBarSeparator />

				<Tooltip content='Salvar'>
					<Button
						loading={isSubmitting}
						loadingText='Salvando'
						onClick={handleSubmit(onSubmitForm)}
					>
						Salvar
					</Button>
				</Tooltip>
			</ActionBarContent>
		</ActionBarRoot>
	)
}

export const FormActionBar = memo(
	FormActionBarComponent,
	(prevProps, nextProps) => {
		return prevProps.isSubmitting === nextProps.isSubmitting
	}
)
