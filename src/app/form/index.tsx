import { FC } from 'react'
import { Navigate } from 'react-router'

export const FormPage: FC = (): JSX.Element => {
	return <Navigate to='/dashboard' />
}
