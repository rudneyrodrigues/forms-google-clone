import { FC, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { GoUnverified } from 'react-icons/go'
import { LuMail, LuUser } from 'react-icons/lu'
import { getAuth, sendEmailVerification } from 'firebase/auth'
import {
	Flex,
	Text,
	Input,
	Stack,
	VStack,
	HStack,
	Heading,
	Separator
} from '@chakra-ui/react'

import { useAuth } from '@/hooks/use-auth'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { toaster } from '@/components/ui/toaster'
import { InputGroup } from '@/components/ui/input-group'
import { HeaderAuth } from '@/components/app/header/auth'
import avatarDefault from '@/assets/images/avatar-default.png'
import {
	ClipboardRoot,
	ClipboardInput,
	ClipboardIconButton
} from '@/components/ui/clipboard'

export const Profile: FC = (): JSX.Element => {
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(false)

	const handleVerifyEmail = async () => {
		setIsLoading(true)
		const auth = getAuth()

		if (!auth.currentUser) return setIsLoading(false)

		await sendEmailVerification(auth.currentUser)
			.then(() => {
				toaster.success({
					description:
						'E-mail de verificação enviado com sucesso! Verifique sua caixa de entrada.',
					type: 'success',
					action: {
						label: 'Fechar',
						onClick: () => {}
					}
				})
			})
			.catch(error => {
				console.error(error)

				toaster.error({
					description: 'Ocorreu um erro ao enviar o e-mail de verificação.',
					type: 'error',
					action: {
						label: 'Fechar',
						onClick: () => {}
					}
				})
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<VStack minH='100vh' w='full'>
			<HeaderAuth />

			<Flex px={4} pt={4} pb={8} flex={1} w='full'>
				<VStack w='full' mx='auto' maxW='breakpoint-md' gap={8}>
					<VStack gap={0}>
						<Heading fontWeight='bold'>Meu Perfil</Heading>
						<Text
							as='span'
							color='fg.muted'
							textAlign='center'
							lineHeight='shorter'
						>
							Aqui você pode ver e editar suas informações de perfil.
						</Text>
					</VStack>

					<VStack w='full' gap={8}>
						<VStack w='full' borderWidth={1} borderRadius='md'>
							<Stack
								p={8}
								gap={6}
								w='full'
								justify='space-between'
								align={['center', 'start']}
								direction={['column-reverse', 'row']}
							>
								<VStack align='start' gap={0}>
									<Heading fontWeight='bold'>Avatar</Heading>

									<Text fontSize='sm' color='fg.muted'>
										Este é seu avatar. Clique no avatar para carregar um
										personalizado de seus arquivos.
									</Text>
								</VStack>

								<Avatar
									size='2xl'
									src={user.photoURL ? user.photoURL : avatarDefault}
									name={user.displayName ? user.displayName : 'Usuário'}
								/>
							</Stack>

							<Separator />

							<HStack px={8} pt={2} pb={4} w='full' justify='space-between'>
								<Text as='span' color='fg.muted' fontSize='sm'>
									Um avatar é opcional, mas altamente recomendado
								</Text>
							</HStack>
						</VStack>

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
											defaultValue={user?.displayName || ''}
											placeholder={user?.displayName || 'Nome'}
										/>
									</InputGroup>
								</Field>
							</VStack>

							<Separator />

							<Stack
								px={8}
								pt={2}
								pb={4}
								w='full'
								gap={4}
								justify='space-between'
								direction={['column', 'row']}
							>
								<Text as='span' color='fg.muted' fontSize='sm'>
									Por favor, uso no máximo 32 caracteres.
								</Text>

								<Button w={['full', 'auto']} size='sm'>
									Salvar
								</Button>
							</Stack>
						</VStack>

						<VStack w='full' borderWidth={1} borderRadius='md'>
							<VStack p={8} gap={6} w='full' align='start'>
								<VStack align='start' gap={0}>
									<HStack>
										<Heading fontWeight='bold'>E-mail</Heading>
										{user.emailVerified ? (
											<MdVerified color='green' />
										) : (
											<GoUnverified color='orange' />
										)}
									</HStack>

									<Text fontSize='sm' color='fg.muted'>
										Seu e-mail é usado para fazer login e receber notificações.
									</Text>
								</VStack>

								<VStack w='full' align='start'>
									{!user.emailVerified ? (
										<Text fontSize='sm' color='fg.warning'>
											Seu e-mail ainda não foi verificado.
										</Text>
									) : (
										<Text fontSize='sm' color='fg.success'>
											Seu e-mail foi verificado com sucesso!
										</Text>
									)}

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
							</VStack>

							<Separator />

							<HStack px={8} pt={2} pb={4} w='full' justify='space-between'>
								<Text as='span' color='fg.muted' fontSize='sm'>
									Seu e-mail não pode ser alterado.
								</Text>

								{!user.emailVerified && (
									<Button
										size='sm'
										loading={isLoading}
										loadingText='Enviando'
										onClick={handleVerifyEmail}
									>
										Verificar e-mail
										<MdVerified />
									</Button>
								)}
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
