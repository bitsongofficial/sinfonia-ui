import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { quasar, transformAssetUrls } from "@quasar/vite-plugin"
import checker from "vite-plugin-checker"
import VitePluginHtmlEnv from "vite-plugin-html-env"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VitePluginHtmlEnv(),
		vue({
			template: { transformAssetUrls },
		}),
		quasar({
			sassVariables: "src/quasar-variables.scss",
		}),
		checker({
			vueTsc: true,
		}),
	],
	resolve: {
		alias: {
			// @ts-ignore
			"@": path.resolve(__dirname, "./src"),
		},
	},
	define: {
		"process.env": {},
		"process.platform": {},
	},
})
