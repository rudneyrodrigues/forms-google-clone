import { z } from 'zod'

import { formSchema } from './schemas'

export type TypeOfQuestion =
	| 'short-text'
	| 'paragraph'
	| 'multiple-choice'
	| 'checkbox'
	| 'dropdown'
	| 'file-upload'

export type TypeQuestions = {
	id: string
	title: string
	mandatory: boolean
	type: TypeOfQuestion
	// question: string
	options: string[]
}

export type SelectType = {
	value: string
	label: string
}

export type Form = z.infer<typeof formSchema>
