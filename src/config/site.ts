import { createListCollection } from '@chakra-ui/react'

export const formSelectType = createListCollection({
	items: [
		{
			label: 'Texto curto',
			value: 'short-text'
		},
		{
			label: 'Parágrafo',
			value: 'paragraph'
		},
		{
			label: 'Múltipla escolha',
			value: 'multiple-choice'
		},
		{
			label: 'Caixa de seleção',
			value: 'checkbox'
		},
		{
			label: 'Lista suspensa',
			value: 'dropdown'
		}
		// {
		// 	label: 'Upload de arquivo',
		// 	value: 'file-upload'
		// }
	]
})
