import { acceptHMRUpdate, defineStore } from "pinia"

export interface SettingsState {
	darkMode: boolean
}

const useSettings = defineStore("settings", {
	state: (): SettingsState => ({
		darkMode: true,
	}),
	actions: {
		setDarkMode(darkMode: boolean) {
			this.darkMode = darkMode
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot))
}

export default useSettings
