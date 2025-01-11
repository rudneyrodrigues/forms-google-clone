import { useNavigate } from 'react-router'
import { destroyCookie, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import {
	User,
	signOut,
	updateProfile,
	signInWithPopup,
	onAuthStateChanged,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword
} from 'firebase/auth'

import { auth } from '@/service/firebase'
import { toaster } from '@/components/ui/toaster'

interface AuthProviderProps {
	children: ReactNode
}

export interface AuthContextData {
	user: User
	loading: boolean
	logout: () => Promise<void>
	loginWithGoogle: () => Promise<void>
	forgotPassword: (email: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState<User>({} as User)

	const login = async (email: string, password: string) => {
		setLoading(true)

		try {
			await signInWithEmailAndPassword(auth, email, password).then(
				async credentials => {
					const user = credentials.user

					if (!user) {
						toaster.error({
							title: 'Erro ao fazer login',
							description: 'Usuário não encontrado',
							action: {
								label: 'Ok',
								onClick: () => {}
							}
						})
						return
					}

					setUser(user)

					setCookie(null, '@user.uid', user.uid, {
						path: '/',
						maxAge: 60 * 60 * 24, // 1 day in seconds
						secure: import.meta.env.NODE_ENV === 'production'
					})

					navigate('/dashboard')
				}
			)
		} catch (error) {
			console.log(error)

			toaster.error({
				title: 'Erro ao fazer login',
				description: 'Usuário não encontrado! Verifique suas credenciais',
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			})
		} finally {
			setLoading(false)
		}
	}

	const register = async (email: string, password: string, name: string) => {
		setLoading(true)

		try {
			await createUserWithEmailAndPassword(auth, email, password).then(
				async credentials => {
					const user = credentials.user

					if (!user) {
						toaster.error({
							title: 'Erro ao fazer login',
							description: 'Usuário não encontrado',
							action: {
								label: 'Ok',
								onClick: () => {}
							}
						})
						return
					}

					await updateProfile(user, { displayName: name })

					setUser(user)

					setCookie(null, '@user.uid', user.uid, {
						path: '/',
						maxAge: 60 * 60 * 24, // 1 day in seconds
						secure: import.meta.env.NODE_ENV === 'production'
					})

					navigate('/dashboard')
				}
			)
		} catch (error) {
			console.log(error)

			toaster.error({
				title: 'Erro ao registrar',
				description: 'Tente novamente mais tarde',
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			})
		} finally {
			setLoading(false)
		}
	}

	const loginWithGoogle = async () => {
		setLoading(true)

		try {
			const provider = new GoogleAuthProvider()

			await signInWithPopup(auth, provider).then(async credentials => {
				const user = credentials.user

				if (!user) {
					toaster.error({
						title: 'Erro ao fazer login',
						description: 'Usuário não encontrado',
						action: {
							label: 'Ok',
							onClick: () => {}
						}
					})
					return
				}

				setUser(user)

				setCookie(null, '@user.uid', user.uid, {
					path: '/',
					maxAge: 60 * 60 * 24, // 1 day in seconds
					secure: import.meta.env.NODE_ENV === 'production'
				})

				navigate('/dashboard')
			})
		} catch (error) {
			console.log(error)

			toaster.error({
				title: 'Erro ao fazer login com Google',
				description: 'Tente novamente mais tarde',
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			})
		} finally {
			setLoading(false)
		}
	}

	const forgotPassword = async (email: string) => {
		await sendPasswordResetEmail(auth, email)
			.then(() => {
				toaster.success({
					title: 'E-mail enviado!',
					description:
						'Verifique sua caixa de entrada para redefinir sua senha',
					action: {
						label: 'Ok',
						onClick: () => {}
					}
				})
			})
			.catch(error => {
				console.log(error)

				toaster.error({
					title: 'Erro ao enviar e-mail',
					description: 'Verifique se o e-mail está correto e tente novamente',
					action: {
						label: 'Ok',
						onClick: () => {}
					}
				})
			})
	}

	const logout = async () => {
		setLoading(true)

		try {
			await signOut(auth).then(() => {
				setUser({} as User)

				destroyCookie(null, '@user.uid', {
					path: '/'
				})

				navigate('/')
			})
		} catch (error) {
			console.log(error)

			toaster.error({
				title: 'Erro ao fazer logout',
				description: 'Tente novamente mais tarde',
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			})
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				setUser(user)

				setCookie(null, '@user.uid', user.uid, {
					path: '/',
					maxAge: 60 * 60 * 24, // 1 day in seconds
					secure: import.meta.env.NODE_ENV === 'production'
				})
			} else {
				setUser({} as User)

				destroyCookie(null, '@user.uid', {
					path: '/'
				})

				navigate('/')
			}
		})

		return () => unsubscribe()
	}, [navigate])

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				loading,
				register,
				forgotPassword,
				loginWithGoogle
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
