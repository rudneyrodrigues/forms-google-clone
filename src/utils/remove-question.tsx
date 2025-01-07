import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

import { TypeQuestions } from '@/config/types'

interface RemoveQuestionProps {
	id: string
	getValues: UseFormGetValues<{
		title: string
		description: string
		questions: {
			id: string
			title: string
			type:
				| 'short-text'
				| 'paragraph'
				| 'multiple-choice'
				| 'checkbox'
				| 'dropdown'
				| 'file-upload'
			mandatory: boolean
			options?: string[] | undefined
		}[]
	}>
	setValue: UseFormSetValue<{
		questions: {
			id: string
			title: string
			type:
				| 'short-text'
				| 'paragraph'
				| 'multiple-choice'
				| 'checkbox'
				| 'dropdown'
				| 'file-upload'
			mandatory: boolean
			options?: string[] | undefined
		}[]
		title: string
		description: string
	}>
}

export const removeQuestion = ({
	id,
	setValue,
	getValues
}: RemoveQuestionProps) => {
	const currentQuestions = getValues('questions') as TypeQuestions[]

	setValue(
		'questions',
		currentQuestions.filter(question => question.id !== id),
		{
			shouldDirty: true
		}
	)
}
