export interface WebMetadata {
	title: string | null | undefined
	description: string | null | undefined
	og: {
		type: string
		url: string
		title: string | null | undefined
		description: string | null | undefined
		image: string | null | undefined
	}
	twitter: {
		card: string
		url: string
		title: string | null | undefined
		description: string | null | undefined
		image: string | null | undefined
	}
}
