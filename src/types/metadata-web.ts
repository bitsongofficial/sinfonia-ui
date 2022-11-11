export interface WebMetadata {
	title: string
	description: string | undefined
	og: {
		type: string
		url: string
		title: string
		description: string | undefined
		image: string | undefined
	}
	twitter: {
		card: string
		url: string
		title: string
		description: string | undefined
		image: string | undefined
	}
}
