import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	overwrite: true,
	schema: "https://testnet-api.sinfonia.zone/query",
	documents: ["src/**/*.vue", "src/graphql/schemas/**/*.ts"],
	generates: {
		"src/graphql/ts/": {
			preset: "client",
			plugins: [],
		},
		"graphql.schema.json": {
			plugins: ["introspection"],
		},
	},
}

export default config
