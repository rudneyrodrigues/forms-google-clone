import useSWR from 'swr'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/service/firebase'
import { FormData } from '@/config/types'

interface UseGetFormById {
	id: string
}

export const useGetFormById = ({ id }: UseGetFormById) => {
	const fetch = async () => {
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
		const newData = {
			...data,
			questions: Object.values(data.questions)
		}

		return newData
	}

	const { data, error, mutate, isLoading } = useSWR('forms', fetch, {
		revalidateOnFocus: false,
		shouldRetryOnError: false
	})

	return {
		data,
		error,
		mutate,
		isLoading
	}
}
