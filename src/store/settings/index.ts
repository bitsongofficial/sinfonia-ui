import { acceptHMRUpdate, defineStore } from "pinia"

export interface SettingsState {
	darkMode: boolean
	disclaimerApprove: boolean
}

const useSettings = defineStore("settings", {
	state: (): SettingsState => ({
		darkMode: true,
		disclaimerApprove: false,
	}),
	actions: {
		setDarkMode(darkMode: boolean) {
			this.darkMode = darkMode
		},
		setDisclaimerApprove(disclaimerApprove: boolean) {
			this.disclaimerApprove = disclaimerApprove
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot))
}

export default useSettings
