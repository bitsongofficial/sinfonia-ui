import { graphql } from "@/graphql/ts"

export const PodcastsPaginated = graphql(`
	query PodcastsPaginated(
		$first: Int
		$after: String
		$last: Int
		$before: String
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
