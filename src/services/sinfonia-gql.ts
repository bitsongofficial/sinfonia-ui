import { DebugLink } from "@storipress/apollo-vue-devtool"
import {
	ApolloClient,
	ApolloLink,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client/core"
import gql from "graphql-tag"

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: import.meta.env.VITE_SINFONIA_GRAPHQL_API,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
	link: ApolloLink.from([new DebugLink(), httpLink]),
	cache,
})

export const merkledropsWithProofsByAddress = gql`
	query merkledropsWithProofsByAddress($address: String) {
		merkledrops {
			merkledrop_id
			denom
			amount
			start_height
			end_height
			name
			image
		}

		merkledropProofs(where: { address: $address }) {
			merkledrop_id
			index
			proofs
			amount
			claimed
		}
	}
`

export const merkledropsList = gql`
	query merkledrops {
		merkledrops {
			merkledrop_id
			denom
			amount
			start_height
			end_height
			name
			image
		}
	}
`

export default apolloClient
