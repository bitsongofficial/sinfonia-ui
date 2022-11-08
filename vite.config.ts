import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { quasar, transformAssetUrls } from "@quasar/vite-plugin"
import checker from "vite-plugin-checker"
import VitePluginHtmlEnv from "vite-plugin-html-env"
import path from "path"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill"
import rollupNodePolyFill from "rollup-plugin-node-polyfills"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			plugins: [
				// Enable rollup polyfills plugin
				// used during production bundling
				rollupNodePolyFill(),
			],
		},
	},
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
			util: "rollup-plugin-node-polyfills/polyfills/util",
			sys: "util",
			events: "rollup-plugin-node-polyfills/polyfills/events",
			stream: "rollup-plugin-node-polyfills/polyfills/stream",
			path: "rollup-plugin-node-polyfills/polyfills/path",
			querystring: "rollup-plugin-node-polyfills/polyfills/qs",
			punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
			url: "rollup-plugin-node-polyfills/polyfills/url",
			string_decoder: "rollup-plugin-node-polyfills/polyfills/string-decoder",
			http: "rollup-plugin-node-polyfills/polyfills/http",
			https: "rollup-plugin-node-polyfills/polyfills/http",
			os: "rollup-plugin-node-polyfills/polyfills/os",
			assert: "rollup-plugin-node-polyfills/polyfills/assert",
			constants: "rollup-plugin-node-polyfills/polyfills/constants",
			_stream_duplex:
				"rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
			_stream_passthrough:
				"rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
			_stream_readable:
				"rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
			_stream_writable:
				"rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
			_stream_transform:
				"rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
			timers: "rollup-plugin-node-polyfills/polyfills/timers",
			console: "rollup-plugin-node-polyfills/polyfills/console",
			vm: "rollup-plugin-node-polyfills/polyfills/vm",
			zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
			tty: "rollup-plugin-node-polyfills/polyfills/tty",
			domain: "rollup-plugin-node-polyfills/polyfills/domain",
		},
	},
	define: {
		"process.env": {},
		"process.platform": {},
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true,
				}),
				NodeModulesPolyfillPlugin(),
			],
		},
	},
})
