import { Dictionary } from "lodash"

export interface AmountBalanced {
	assetsAmounts: Dictionary<string>
	shareOutAmount: string
}
