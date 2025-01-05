import useSWR from 'swr'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/service/firebase'
import { TypeQuestions } from '@/config/types'

type FormData = {
	id: string
	title: string
	description?: string
	questions: {
		[key: string]: TypeQuestions
	}
	visibility: 'public' | 'private'
	createdBy: string
	createdAt: Date
}

interface UseGetAllFormsProps {
	userId: string
}

export const useGetAllForms = ({ userId }: UseGetAllFormsProps) => {
	const fetch = async () => {
		const q = query(collection(db, 'forms'), where('createdBy', '==', userId))

		const querySnapshot = await getDocs(q)

		const data = querySnapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			}
		})

		return data as FormData[]
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