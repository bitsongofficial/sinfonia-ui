/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue"
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_BITSONG_CONFIG_URL: string
	readonly VITE_BITSONG_FAUCET_URL: string
	readonly VITE_MODE: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
