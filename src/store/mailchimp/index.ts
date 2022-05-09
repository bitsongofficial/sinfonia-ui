import { acceptHMRUpdate, defineStore } from "pinia"
import { subscribeMailchimp } from "@/services/mailchimp"
import { notifyError, notifyLoading, notifySuccess } from "@/common"

export interface AuthState {
	loading: boolean
	error: boolean
	success: boolean
}

const useMailchimp = defineStore("mailchimp", {
	state: (): AuthState => ({
		loading: false,
		error: false,
		success: false,
	}),
	actions: {
		async subscribeMailchimp(email: string, listID: string) {
			const loader = notifyLoading(
				"Subscription loading",
				"Waiting for newsletter subscription"
			)

			try {
				this.loading = true
				this.error = false
				this.success = false

				await subscribeMailchimp(email, listID)

				this.success = true

				notifySuccess(
					"Subscription successful",
					"Email successfully added to the newsletter."
				)
			} catch (error) {
				console.error(error)
				this.error = true

				notifyError(
					"Newsletter subscription failed",
					"An error occurred, please try again later."
				)

				throw error
			} finally {
				this.loading = false

				loader()
			}
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMailchimp, import.meta.hot))
}

export default useMailchimp
