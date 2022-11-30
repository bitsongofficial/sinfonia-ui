import { graphql } from "@/graphql/ts"

export const PodcastsPaginated = graphql(`
	query PodcastsPaginated(
		$first: Int!
		$after: String!
		$last: Int!
		$before: String!
	) {
		podcasts(
			pagination: { first: $first, after: $after, last: $last, before: $before }
		) {
			totalCount
			pageInfo {
				startCursor
				endCursor
				hasPreviousPage
				hasNextPage
			}
			edges {
				cursor
				node {
					_id
					title
					description
					original_feed_url
					link
					image
					author
					copyright
					language
					type
					explicit
					status_code
					status
					created_at
					updated_at
					last_parsed_at
				}
			}
		}
	}
`)

export const PodcastsEpisodes = graphql(`
	query podcastEpisodes($podcast_id: ObjectID!) {
		podcastEpisodes(podcast_id: $podcast_id) {
			_id
			title
			description
			image
			enclosures {
				url
				type
				length
			}
		}
	}
`)

export const Podcast = graphql(`
	query podcast($id: ObjectID!) {
		podcast(id: $id) {
			_id
			title
			description
			image
			author
		}
	}
`)

export const PodcastWithEpisodes = graphql(`
	query podcastWithEpisodes($id: ObjectID!) {
		podcast(id: $id) {
			_id
			title
			description
			image
			author
		}
		podcastEpisodes(podcast_id: $id) {
			_id
			title
			description
			image
			podcast_id
			enclosures {
				url
				type
				length
			}
		}
	}
`)

export const PodcastEpisode = graphql(`
	query podcastEpisode($id: ObjectID!) {
		podcastEpisode(id: $id) {
			_id
			title
			description
			image
			podcast_id
			enclosures {
				url
				type
				length
			}
		}
	}
`)
