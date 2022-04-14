import { TwitterPagination, TweetAuthor } from "@/types"
import { externalClient } from "./external-client"

export const getTweetAuthors = async () => {
	const { data: result } = await externalClient.get<
		TwitterPagination<TweetAuthor>
	>(`${import.meta.env.VITE_BITSONG_TWITTER_API}subscriptions`)

	return result
}
