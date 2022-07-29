import { Token, TokenBalance } from "@/types"
import { uniqBy } from "lodash"
import { acceptHMRUpdate, defineStore } from "pinia"

export interface SettingsState {
	darkMode: boolean
	disclaimerApprove: boolean
	recentTokenSelections: Token[]
	breadcrumbPageTitle?: string
}

const useSettings = defineStore("settings", {
	state: (): SettingsState => ({
		darkMode: true,
		disclaimerApprove: false,
		recentTokenSelections: [],
		breadcrumbPageTitle: undefined,
	}),
	actions: {
		setDarkMode(darkMode: boolean) {
			this.darkMode = darkMode
		},
		setDisclaimerApprove(disclaimerApprove: boolean) {
			this.disclaimerApprove = disclaimerApprove
		},
		setRecentTokenSelection(token: Token) {
			const recentTokenSelections = [...this.recentTokenSelections]

			recentTokenSelections.unshift(token)

			this.recentTokenSelections = uniqBy(recentTokenSelections, "symbol").slice(
				0,
				5
			)
		},
	},
	persistedState: {
		persist: true,
		includePaths: ["recentTokenSelections", "disclaimerApprove", "darkMode"],
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot))
}

export default useSettings
