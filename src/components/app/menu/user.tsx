import { FC, memo } from 'react'
import { Text } from '@chakra-ui/react'

import { useAuth } from '@/hooks/use-auth'
import { Avatar } from '@/components/ui/avatar'
import avatarDefault from '@/assets/images/avatar-default.png'
import {
	MenuRoot,
	MenuItem,
	MenuTrigger,
	MenuContent,
	MenuItemGroup,
	MenuSeparator
} from '@/components/ui/menu'
import { Link } from 'react-router'

export const UserMenu: FC = memo((): JSX.Element => {
	const { user, logout } = useAuth()

	return (
		<MenuRoot
			positioning={{
				placement: 'bottom-end'
			}}
		>
			<MenuTrigger rounded='full' cursor='pointer'>
				<Avatar
					name={user.displayName || user.email || 'Usuário'}
					src={user.photoURL || avatarDefault}
				/>
			</MenuTrigger>

			<MenuContent minW='10rem'>
				<Text maxW='12rem' truncate>
					{user.displayName || user.email || 'Usuário'}
				</Text>

				<MenuSeparator />

				<MenuItemGroup>
					<MenuItem value='profile' asChild>
						<Link to='/profile'>Meu perfil</Link>
					</MenuItem>
					<MenuItem value='settings'>Configurações</MenuItem>
				</MenuItemGroup>

				<MenuSeparator />

				<MenuItemGroup>
					<MenuItem value='forms'>Formulários</MenuItem>
					<MenuItem value='results'>Resultados</MenuItem>
				</MenuItemGroup>

				<MenuSeparator />

				<MenuItem
					value='logout'
					color='fg.error'
					onClick={logout}
					_hover={{
						bg: 'bg.error',
						color: 'fg.error'
					}}
				>
					Sair
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	)
})
UserMenu.displayName = 'UserMenu'
