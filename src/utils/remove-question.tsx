import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

import { Form, TypeQuestions } from '@/config/types'

interface RemoveQuestionProps {
	id: string
	setValue: UseFormSetValue<Form>
	getValues: UseFormGetValues<Form>
}

export const removeQuestion = ({
	id,
	setValue,
	getValues
}: RemoveQuestionProps) => {
	const currentQuestions = getValues('questions') as TypeQuestions[]

	// Filtra a questão a ser removida
	const filteredQuestions = currentQuestions.filter(
		question => question.id !== id
	)

	// Reorganiza a ordem das questões restantes
	const reorderedQuestions = filteredQuestions.map((question, index) => ({
		...question,
		order: index
	}))

	// Atualiza o estado com as questões reorganizadas
	setValue('questions', reorderedQuestions, {
		shouldDirty: true
	})
}
