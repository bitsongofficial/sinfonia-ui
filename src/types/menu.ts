export interface MenuItem {
	icon: {
		name: string
		width: number
		height: number
	}
	label: string
	path: string
	isLink?: boolean
}
