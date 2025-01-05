import { z } from 'zod'

export const formSchema = z.object({
	title: z.string().min(1, { message: 'Título é obrigatório' }).trim(),
	description: z.string().trim(),
	questions: z.array(
		z.object({
			id: z.string().uuid(),
			title: z.string().min(1, { message: 'Pergunta é obrigatória' }).trim(),
			mandatory: z.boolean(),
			type: z.enum([
				'short-text',
				'paragraph',
				'multiple-choice',
				'checkbox',
				'dropdown',
				'file-upload'
			]),
			// question: z
			// 	.string()
			// 	.min(1, { message: 'O tipo da pergunta é obrigatório' })
			// 	.trim(),
			options: z.array(z.string()).optional()
		})
	)
})
