import { FC, memo } from 'react'
import { LuPlus } from 'react-icons/lu'
import { IconButton, Text } from '@chakra-ui/react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

import { addQuestion } from '@/utils/add-question'
import { Form, TypeOfQuestion } from '@/config/types'
import {
	ActionBarRoot,
	ActionBarContent,
	ActionBarSeparator
} from '@/components/ui/action-bar'

interface FormActionBarProps {
	isSubmitting: boolean
	setValue: UseFormSetValue<Form>
	getValues: UseFormGetValues<Form>
	watchQuestions: {
		title: string
		id: string
		type: TypeOfQuestion
		mandatory: boolean
		options?: string[] | undefined
	}[]
}

const FormActionBarComponent: FC<FormActionBarProps> = ({
	setValue,
	getValues,
	isSubmitting,
	watchQuestions
}: FormActionBarProps): JSX.Element => {
	return (
		<ActionBarRoot open={true}>
			<ActionBarContent>
				<IconButton
					size='sm'
					variant='ghost'
					disabled={isSubmitting}
					onClick={() =>
						addQuestion({ setValue, getValues, type: 'short-text' })
					}
				>
					<LuPlus />
				</IconButton>

				<ActionBarSeparator />

				<Text color='fg.muted' fontSize='xs'>
					{watchQuestions.length}{' '}
					{watchQuestions.length === 1 ? 'pergunta' : 'perguntas'}
				</Text>
			</ActionBarContent>
		</ActionBarRoot>
	)
}

export const FormActionBar = memo(
	FormActionBarComponent,
	(prevProps, nextProps) => {
		return (
			prevProps.isSubmitting === nextProps.isSubmitting &&
			prevProps.watchQuestions.length === nextProps.watchQuestions.length
		)
	}
)
