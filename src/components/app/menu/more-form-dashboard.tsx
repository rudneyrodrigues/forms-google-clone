import { Link } from 'react-router'
import { FC, memo, ReactNode } from 'react'
import { LuExternalLink } from 'react-icons/lu'
import { MdDeleteOutline, MdTitle } from 'react-icons/md'

import { FormData } from '@/config/types'
import { DialogRenameForm } from '../dialog/rename-form'
import { DialogDeleteForm } from '../dialog/delete-form'
import {
	MenuItem,
	MenuRoot,
	MenuTrigger,
	MenuContent,
	MenuSeparator,
	MenuContextTrigger
} from '@/components/ui/menu'

interface MoreFormDashboardProps {
	form: FormData
	children: ReactNode
	type?: 'context-menu' | 'dropdown'
}

export const MoreFormDashboard: FC<MoreFormDashboardProps> = memo(
	({ form, children, type = 'dropdown' }: MoreFormDashboardProps) => {
		return (
			<MenuRoot positioning={{ placement: 'bottom-end' }}>
				{type === 'dropdown' ? (
					<MenuTrigger asChild>{children}</MenuTrigger>
				) : (
					<MenuContextTrigger>{children}</MenuContextTrigger>
				)}

				<MenuContent minW='14rem'>
					<DialogRenameForm formId={form.id} defaultTitle={form.title}>
						<MenuItem value='rename'>
							<MdTitle size={20} />
							Renomear
						</MenuItem>
					</DialogRenameForm>
					<MenuItem value='new-tab' asChild>
						<Link to={`/form/${form.id}`} target='_blank'>
							<LuExternalLink size={20} />
							Abrir em nova guia
						</Link>
					</MenuItem>

					<MenuSeparator />

					<DialogDeleteForm formId={form.id} title={form.title}>
						<MenuItem
							value='delete'
							color='fg.error'
							_hover={{
								bg: 'bg.error',
								color: 'fg.error'
							}}
						>
							<MdDeleteOutline size={20} />
							Deletar projeto
						</MenuItem>
					</DialogDeleteForm>
				</MenuContent>
			</MenuRoot>
		)
	}
)
MoreFormDashboard.displayName = 'MoreFormDashboard'
