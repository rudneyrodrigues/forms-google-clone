import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

import { TypeOfQuestion, TypeQuestions } from '@/config/types'

interface AddQuestionProps {
	type: TypeOfQuestion
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

export const addQuestion = ({
	type,
	setValue,
	getValues
}: AddQuestionProps) => {
	const newQuestion = {
		id: crypto.randomUUID(),
		title: 'Pergunta sem título',
		mandatory: false,
		type,
		options: ['']
	}

	const currentQuestions = getValues('questions') as TypeQuestions[]
	setValue('questions', [...currentQuestions, newQuestion], {
		shouldDirty: true
	})
}
