import { doc, getDoc } from 'firebase/firestore'
import { LoaderFunctionArgs } from 'react-router'

import { db } from '@/service/firebase'
import { FormData, FormDataEdit } from '@/config/types'

export const loaderFormEdit = async ({
	params
}: LoaderFunctionArgs): Promise<FormDataEdit> => {
	const { id } = params as { id: string }

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
	const newData = {
		...data,
		questions: Object.values(data.questions)
	} as FormDataEdit

	// Ordene as perguntas pelo campo order
	newData.questions.sort((a, b) => a.order - b.order)

	return newData
}
