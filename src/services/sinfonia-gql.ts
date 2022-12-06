import { DebugLink } from "@storipress/apollo-vue-devtool"
import {
	ApolloClient,
	ApolloLink,
	createHttpLink,
	InMemoryCache,
	NextLink,
	Operation,
	Observable,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import gql from "graphql-tag"
import useAuth from "@/store/auth"
import { notifyError } from "@/common"

const promiseToObservable = (promise: Promise<Operation>) =>
	new Observable<Operation>((subscriber) => {
		promise.then(
			(value) => {
				if (subscriber.closed) return
				subscriber.next(value)
				subscriber.complete()
			},
			(err) => subscriber.error(err)
		)
	})

const retryAuth = async (operation: Operation, oldHeaders: any) => {
	const authStore = useAuth()

	const token = await authStore.generateToken()

	operation.setContext({
		headers: {
			...oldHeaders,
			"x-btsg-web3-token": token ? token : "",
		},
	})

	return operation
}

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				notifyError(err.message)
				const context = operation.getContext()
				const oldHeaders = context.headers

				if (
					err.message.includes("invalid") ||
					err.message.includes("cannot unmarshal w3t") ||
					err.message.includes("expired")
				) {
					return promiseToObservable(retryAuth(operation, oldHeaders)).flatMap(
						(op) => forward(op)
					)
				}
			}
		}

		// To retry on network errors, we recommend the RetryLink
		// instead of the onError link. This just logs the error.
		if (networkError) {
			console.log(`[Network error]: ${networkError}`)
		}
	}
)

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${import.meta.env.VITE_SINFONIA_GRAPHQL_API}/query`,
})

const authLink = setContext((_, { headers }) => {
	const authStore = useAuth()
	// get the authentication token from local storage if it exists
	const token = authStore.token
	// return the headers to the context so httpLink can read them

	return {
		headers: {
			...headers,
			"x-btsg-web3-token": token ? token : "",
		},
	}
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
	link: ApolloLink.from([errorLink, new DebugLink(), authLink.concat(httpLink)]),
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
