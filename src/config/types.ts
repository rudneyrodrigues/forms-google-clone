export type TypeQuestion =
	| 'short-text'
	| 'paragraph'
	| 'multiple-choice'
	| 'checkbox'
	| 'dropdown'
	| 'file-upload'

export type Questions = {
	id: string
	title: string
	mandatory: boolean
	type: TypeQuestion
	question: string
	options: string[]
}

export type SelectType = {
	value: string
	label: string
}
