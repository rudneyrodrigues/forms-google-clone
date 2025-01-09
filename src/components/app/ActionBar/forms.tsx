import { FC, memo } from 'react'
import { Link } from 'react-router'
import { LuPlus, LuTrash } from 'react-icons/lu'
import { MdShare } from 'react-icons/md'
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
	formId?: string
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
	formId,
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

				{formId && (
					<IconButton size='sm' variant='ghost' disabled={isSubmitting} asChild>
						<Link to={`/form/${formId}/share`} target='_blank'>
							<MdShare />
						</Link>
					</IconButton>
				)}

				{formId && (
					<IconButton size='sm' variant='ghost'>
						<LuTrash />
					</IconButton>
				)}

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
