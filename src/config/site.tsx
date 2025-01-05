import { PiTextAlignLeft } from 'react-icons/pi'
import { createListCollection } from '@chakra-ui/react'
import {
	MdOutlineShortText,
	MdRadioButtonUnchecked,
	MdCheckBoxOutlineBlank,
	MdOutlineExpandCircleDown
} from 'react-icons/md'

export const formSelectType = createListCollection({
	items: [
		{
			label: 'Texto curto',
			value: 'short-text',
			icon: <MdOutlineShortText size={24} />
		},
		{
			label: 'Parágrafo',
			value: 'paragraph',
			icon: <PiTextAlignLeft size={24} />
		},
		{
			label: 'Múltipla escolha',
			value: 'multiple-choice',
			icon: <MdRadioButtonUnchecked size={24} />
		},
		{
			label: 'Caixa de seleção',
			value: 'checkbox',
			icon: <MdCheckBoxOutlineBlank size={24} />
		},
		{
			label: 'Lista suspensa',
			value: 'dropdown',
			icon: <MdOutlineExpandCircleDown size={24} />
		}
		// {
		// 	label: 'Upload de arquivo',
		// 	value: 'file-upload'
		// }
	]
})
