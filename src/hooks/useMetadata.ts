import { WebMetadata } from "@/types"
import { ComputedRef, onUnmounted, watch } from "vue"

export const defaultMetadata: WebMetadata = {
	title: "Sinfonia",
	description: "Your Music FanToken Marketplace powered by BitSong on Osmosis",
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: "Sinfonia",
		description: "Your Music FanToken Marketplace powered by BitSong on Osmosis",
		image: `${import.meta.env.VITE_BASE_URL}cover.jpeg`,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: "Sinfonia",
		description: "Your Music FanToken Marketplace powered by BitSong on Osmosis",
		image: `${import.meta.env.VITE_BASE_URL}cover.jpeg`,
	},
}

export const queryAndSetMetadata = (metadata: WebMetadata) => {
	const titleMetadata = window.document.querySelector("title")

	if (titleMetadata && metadata.title) {
		titleMetadata.innerHTML = metadata.title
	}

	const descriptionMetadata = window.document.querySelector(
		'meta[name="description"]'
	)

	if (descriptionMetadata && metadata.description) {
		descriptionMetadata.setAttribute("content", metadata.description)
	}

	if (metadata.og) {
		for (const meta in metadata.og) {
			const ogMetadata = window.document.querySelector(
				`meta[property="og:${meta}"]`
			)

			if (ogMetadata) {
				ogMetadata.setAttribute("content", metadata.og[meta])
			}
		}
	}

	if (metadata.twitter) {
		for (const meta in metadata.twitter) {
			const ogMetadata = window.document.querySelector(
				`meta[name="twitter:${meta}"]`
			)

			if (ogMetadata) {
				ogMetadata.setAttribute("content", metadata.twitter[meta])
			}
		}
	}
}

export const useMetadata = (metadata: ComputedRef<WebMetadata>) => {
	const watchMetadata = watch(
		() => metadata.value,
		(currentmeta) => {
			queryAndSetMetadata(currentmeta)
		},
		{
			immediate: true,
		}
	)

	onUnmounted(() => {
		watchMetadata()
		queryAndSetMetadata(defaultMetadata)
	})
}
