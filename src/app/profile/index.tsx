import { FC } from 'react'
import { LuMail, LuUser } from 'react-icons/lu'
import {
	Flex,
	Heading,
	HStack,
	Input,
	Separator,
	Text,
	VStack
} from '@chakra-ui/react'

import { useAuth } from '@/hooks/use-auth'
import { Field } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import { Button } from '@/components/ui/button'
import {
	ClipboardIconButton,
	ClipboardInput,
	ClipboardRoot
} from '@/components/ui/clipboard'

export const Profile: FC = (): JSX.Element => {
	const { user } = useAuth()

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={8} flex={1} w='full'>
				<VStack w='full' mx='auto' maxW='breakpoint-md' gap={8}>
					<VStack gap={0}>
						<Heading fontWeight='bold'>Meu Perfil</Heading>
						<Text as='span' color='fg.muted'>
							Aqui você pode ver e editar suas informações de perfil.
						</Text>
					</VStack>

					<VStack w='full'>
						<VStack w='full' borderWidth={1} borderRadius='md'>
							<VStack p={8} gap={6} w='full' align='start'>
								<VStack align='start' gap={0}>
									<Heading fontWeight='bold'>Nome de exibição</Heading>

									<Text fontSize='sm' color='fg.muted'>
										Insira seu nome completo ou um nome de exibição com o qual
										você se sinta confortável.
									</Text>
								</VStack>

								<Field>
									<InputGroup w='full' maxW='xs' startElement={<LuUser />}>
										<Input
											type='text'
											placeholder={user?.displayName || 'Nome'}
										/>
									</InputGroup>
								</Field>
							</VStack>

							<Separator />

							<HStack px={8} pt={2} pb={4} w='full' justify='space-between'>
								<Text as='span' color='fg.muted' fontSize='sm'>
									Por favor, uso no máximo 32 caracteres.
								</Text>

								<Button size='sm'>Salvar</Button>
							</HStack>
						</VStack>

						<VStack w='full' borderWidth={1} borderRadius='md'>
							<VStack p={8} gap={6} w='full' align='start'>
								<VStack align='start' gap={0}>
									<Heading fontWeight='bold'>E-mail</Heading>

									<Text fontSize='sm' color='fg.muted'>
										Seu e-mail é usado para fazer login e receber notificações.
									</Text>
								</VStack>

								<Field disabled>
									<InputGroup w='full' maxW='xs' startElement={<LuMail />}>
										<Input
											type='text'
											value={user?.email || ''}
											placeholder={user?.email || 'E-mail'}
										/>
									</InputGroup>
								</Field>
							</VStack>

							<Separator />

							<HStack px={8} pt={2} pb={4} w='full' justify='space-between'>
								<Text as='span' color='fg.muted' fontSize='sm'>
									Seu e-mail não pode ser alterado. Caso precise, entre em
									contato com o suporte.
								</Text>

								{/* <Button size='sm' disabled>
									Salvar
								</Button> */}
							</HStack>
						</VStack>

						<VStack w='full' borderWidth={1} borderRadius='md'>
							<VStack p={8} gap={6} w='full' align='start'>
								<VStack align='start' gap={0}>
									<Heading fontWeight='bold'>Forms ID</Heading>

									<Text fontSize='sm' color='fg.muted'>
										Este é o seu ID de usuário no Forms. Ele é único e não pode
										ser alterado.
									</Text>
								</VStack>

								<ClipboardRoot w='full' maxW='xs' value={user.uid}>
									<InputGroup
										width='full'
										endElement={<ClipboardIconButton me='-2' />}
									>
										<ClipboardInput />
									</InputGroup>
								</ClipboardRoot>
							</VStack>

							<Separator />

							<HStack px={8} pt={2} pb={4} w='full' justify='space-between'>
								<Text as='span' color='fg.muted' fontSize='sm'>
									Usado ao interagir com a API do Forms.
								</Text>
							</HStack>
						</VStack>
					</VStack>
				</VStack>
			</Flex>
		</VStack>
	)
}
