import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

import { Form, TypeOfQuestion, TypeQuestions } from '@/config/types'

interface AddQuestionProps {
	type: TypeOfQuestion
	setValue: UseFormSetValue<Form>
	getValues: UseFormGetValues<Form>
}

export const addQuestion = ({
	type,
	setValue,
	getValues
}: AddQuestionProps) => {
	const currentQuestions = getValues('questions') as TypeQuestions[]

	const newQuestion = {
		id: crypto.randomUUID(),
		title: 'Pergunta sem título',
		mandatory: false,
		type,
		order: currentQuestions.length,
		options: ['']
	}

	setValue('questions', [...currentQuestions, newQuestion], {
		shouldDirty: true
	})
}
