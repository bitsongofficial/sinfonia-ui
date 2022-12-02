import { PodcastEpisode } from "@/graphql/ts/graphql"

export const episodePlaceholderImage = (
	episode?: PodcastEpisode | null,
	placeholder?: string | null
) => {
	if (episode?.image && episode.image.length > 0) {
		return episode.image
	}

	return placeholder ?? ""
}
