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

export const PodcastEpisodes = graphql(`
	query podcastEpisodes(
		$podcast_id: ObjectID!
		$first: Int!
		$after: String!
		$last: Int!
		$before: String!
	) {
		podcastEpisodes(
			podcast_id: $podcast_id
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
					image
					podcast_id
					duration
					pub_date
				}
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

export const PodcastEpisode = graphql(`
	query podcastEpisode($id: ObjectID!, $podcast_id: ObjectID!) {
		podcast(id: $podcast_id) {
			_id
			title
			image
		}
		podcastEpisode(id: $id) {
			_id
			title
			description
			image
			podcast_id
			duration
			pub_date
		}
	}
`)

export const SearchPodcasts = graphql(`
	query searchPodcasts($text: String!, $start: Int) {
		searchPodcasts(text: $text, start: $start) {
			numFound
			start
			docs {
				_id
				title
				image
				author
			}
		}
	}
`)

export const SearchPodcastEpisodes = graphql(`
	query searchPodcastEpisodes($text: String!, $start: Int) {
		searchPodcastEpisodes(text: $text, start: $start) {
			numFound
			start
			docs {
				_id
				title
				image
				description
				duration
				pub_date
			}
		}
	}
`)

export const Search = graphql(`
	query search($text: String!, $start: Int) {
		searchPodcasts(text: $text, start: $start) {
			numFound
			start
			docs {
				_id
				title
				image
				author
			}
		}
		searchPodcastEpisodes(text: $text, start: $start) {
			numFound
			start
			docs {
				_id
				title
				image
				description
				duration
				podcast_id
				pub_date
			}
		}
	}
`)

export const PodcastEpisodeEnclosure = graphql(`
	query podcastEpisodeEnclosure($id: ObjectID!) {
		podcastEpisodeEnclosure(id: $id) {
			url
			length
			type
		}
	}
`)

export const PodcastExplore = graphql(`
	query podcastExplore {
		podcastExplore {
			elements {
				title
				hasMore
				viewMode
				items {
					_id
					image
					title
					subtitle
					link
				}
			}
		}
	}
`)

export const PodcastExploreSection = graphql(`
	query podcastExploreSection($section: String!, $start: Int!) {
		podcastExploreSection(section: $section, start: $start) {
			elements {
				title
				hasMore
				viewMode
				items {
					_id
					image
					title
					subtitle
					link
				}
			}
		}
	}
`)

export const Me = graphql(`
	query me {
		me {
			address
			expire_at
		}
	}
`)
