import useSWR from 'swr'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/service/firebase'
import { FormData, FormDataEdit } from '@/config/types'

interface UseGetFormById {
	id: string | undefined
}

export const useGetFormById = ({ id }: UseGetFormById) => {
	const fetch = async () => {
		if (!id) {
			throw new Error('ID não fornecido')
		}

		const formRef = doc(db, 'forms', id)
		const docSnap = await getDoc(formRef)

		if (!docSnap.exists()) {
			throw new Error('Formulário não encontrado')
		}

		const data = {
			id: docSnap.id,
			...docSnap.data()
		} as FormData

		// Transforme o objeto de questions em um array
		const formattedData = {
			...data,
			questions: Object.values(data.questions)
		} as FormDataEdit

		// Ordene as perguntas pelo campo order
		formattedData.questions.sort((a, b) => a.order - b.order)

		return formattedData
	}

	const { data, error, mutate, isLoading } = useSWR(
		id ? `forms/${id}` : null,
		fetch,
		{
			revalidateOnFocus: false,
			shouldRetryOnError: false
		}
	)

	return {
		data,
		error,
		mutate,
		isLoading
	}
}
