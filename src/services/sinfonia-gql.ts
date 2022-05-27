import { provideApolloClient } from "@vue/apollo-composable"
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client/core"

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: import.meta.env.VITE_SINFONIA_GRAPHQL_API,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
})

provideApolloClient(apolloClient)

export default apolloClient
