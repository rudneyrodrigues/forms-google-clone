import type { ButtonProps, InputProps } from '@chakra-ui/react'
import {
	Button,
	Clipboard as ChakraClipboard,
	IconButton,
	Input
} from '@chakra-ui/react'
import * as React from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { LuCheck, LuClipboard, LuLink } from 'react-icons/lu'

interface ClipboardIconProps extends ChakraClipboard.IndicatorProps {
	icon?: React.FC<IconBaseProps>
}

const ClipboardIcon = React.forwardRef<HTMLDivElement, ClipboardIconProps>(
	function ClipboardIcon({ icon: Icon, ...props }, ref) {
		return (
			<ChakraClipboard.Indicator copied={<LuCheck />} {...props} ref={ref}>
				{Icon ? <Icon /> : <LuClipboard />}
			</ChakraClipboard.Indicator>
		)
	}
)

const ClipboardCopyText = React.forwardRef<
	HTMLDivElement,
	ChakraClipboard.IndicatorProps
>(function ClipboardCopyText(props, ref) {
	return (
		<ChakraClipboard.Indicator copied='Copied' {...props} ref={ref}>
			Copy
		</ChakraClipboard.Indicator>
	)
})

export const ClipboardLabel = React.forwardRef<
	HTMLLabelElement,
	ChakraClipboard.LabelProps
>(function ClipboardLabel(props, ref) {
	return (
		<ChakraClipboard.Label
			textStyle='sm'
			fontWeight='medium'
			display='inline-block'
			mb='1'
			{...props}
			ref={ref}
		/>
	)
})

interface ClipboardButtonProps extends ButtonProps {
	icon?: React.FC<IconBaseProps>
}

export const ClipboardButton = React.forwardRef<
	HTMLButtonElement,
	ClipboardButtonProps
>(function ClipboardButton({ icon: Icon, ...props }, ref) {
	return (
		<ChakraClipboard.Trigger asChild>
			<Button ref={ref} size='sm' variant='surface' {...props}>
				<ClipboardIcon icon={Icon ? Icon : LuClipboard} />
				<ClipboardCopyText />
			</Button>
		</ChakraClipboard.Trigger>
	)
})

export const ClipboardLink = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function ClipboardLink(props, ref) {
		return (
			<ChakraClipboard.Trigger asChild>
				<Button
					unstyled
					variant='plain'
					size='xs'
					display='inline-flex'
					alignItems='center'
					gap='2'
					ref={ref}
					{...props}
				>
					<LuLink />
					<ClipboardCopyText />
				</Button>
			</ChakraClipboard.Trigger>
		)
	}
)

interface ClipboardIconButtonProps extends ButtonProps {
	icon?: React.FC<IconBaseProps>
}

export const ClipboardIconButton = React.forwardRef<
	HTMLButtonElement,
	ClipboardIconButtonProps
>(function ClipboardIconButton({ icon: Icon, ...props }, ref) {
	return (
		<ChakraClipboard.Trigger asChild>
			<IconButton ref={ref} size='xs' variant='subtle' {...props}>
				<ClipboardIcon icon={Icon ? Icon : LuClipboard} />
				<ClipboardCopyText srOnly />
			</IconButton>
		</ChakraClipboard.Trigger>
	)
})

export const ClipboardInput = React.forwardRef<HTMLInputElement, InputProps>(
	function ClipboardInputElement(props, ref) {
		return (
			<ChakraClipboard.Input asChild>
				<Input ref={ref} {...props} />
			</ChakraClipboard.Input>
		)
	}
)

export const ClipboardRoot = ChakraClipboard.Root
