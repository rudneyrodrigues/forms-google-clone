import { FC } from 'react'
import { useParams } from 'react-router'
import { Flex, Text, VStack } from '@chakra-ui/react'

import { ErrorPage } from '@/app/error'
import { LoadingPage } from '@/app/loading'
import { HeaderAuth } from '@/components/app/header/auth'
import { useGetFormById } from '@/hooks/swr/useGetFormById'

export const FormView: FC = (): JSX.Element => {
	const { id } = useParams() as { id: string }
	const { data, error, isLoading } = useGetFormById({ id })

	if (isLoading) {
		return <LoadingPage />
	}

	if (error || !data) {
		return <ErrorPage />
	}

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={12} flex={1} w='full'>
				<Text>{data.title}</Text>
			</Flex>
		</VStack>
	)
}
