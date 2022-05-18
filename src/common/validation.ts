import { defineRule } from "vee-validate"
import { required } from "@vee-validate/rules"
import { compareBalance, isNaN, gtnZero, equalZero } from "@/common/numbers"

interface CompareBalanceValidation {
	compare: string
}

defineRule("required", (value) => {
	const valid = required(value)

	if (!valid) {
		return "Required field"
	}

	return true
})

defineRule<string>("isNaN", (value) => {
	if (isNaN(value)) {
		return "Amount must be a decimal value"
	}

	return true
})

defineRule<string>("gtnZero", (value) => {
	if (!gtnZero(value)) {
		return "Amount must be greater then zero"
	}

	return true
})

defineRule<string>("equalZero", (value) => {
	if (equalZero(value)) {
		return "Amount must be greater then zero"
	}

	return true
})

defineRule<string, CompareBalanceValidation>(
	"compareBalance",
	(value, { compare }) => {
		if (!compareBalance(value, compare)) {
			return "You don't have enough coins"
		}

		return true
	}
)
