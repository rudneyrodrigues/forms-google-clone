import { useNavigate } from 'react-router'
import { FC, memo, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'

import { Button } from '../ui/button'
import { db } from '@/service/firebase'
import { toaster } from '../ui/toaster'
import { useAuth } from '@/hooks/use-auth'

export const NewFormButton: FC = memo((): JSX.Element => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	async function createForm() {
		setLoading(true)

		try {
			const formId = crypto.randomUUID()

			await setDoc(doc(db, 'forms', formId), {
				title: 'Formulário sem título',
				description: '',
				questions: {
					[crypto.randomUUID()]: {
						id: crypto.randomUUID(),
						title: 'Pergunta sem título',
						order: 0,
						mandatory: false,
						type: 'short-text',
						options: ['']
					}
				},
				visibility: 'public',
				answers: {
					accepting: true,
					loginRequired: false
				},
				presentations: {
					showProgressBar: true,
					shuffleQuestions: false,
					confirmationMessage:
						'Sua resposta foi registrada. Obrigado por responder o formulário!'
				},
				createdAt: new Date(),
				createdBy: user.uid
			})

			navigate(`/form/${formId}`)
		} catch (error) {
			console.error(error)

			toaster.error({
				title: 'Erro ao criar formulário',
				description:
					'Ocorreu um erro ao tentar criar o formulário. Tente novamente mais tarde.',
				action: {
					label: 'Entendi',
					onClick: () => {}
				}
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			variant='outline'
			loading={loading}
			onClick={createForm}
			loadingText='Criando formulário'
		>
			Novo formulário
		</Button>
	)
})
