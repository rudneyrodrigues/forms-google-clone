import { FC } from 'react'
import { useLoaderData } from 'react-router'
import { Flex, Text, VStack } from '@chakra-ui/react'

import { FormDataView } from '@/config/types'
import { HeaderAuth } from '@/components/app/header/auth'

export const FormView: FC = (): JSX.Element => {
	const data = useLoaderData() as FormDataView

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={12} flex={1} w='full'>
				<Text>{data.title}</Text>
			</Flex>
		</VStack>
	)
}
