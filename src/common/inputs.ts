import { ValidationRule } from "quasar"
import { Ref } from "vue"

export const validateRules = (
	rules: ValidationRule<any>[] | undefined,
	value: any,
	output: Ref<string>
): boolean => {
	const failedRule = rules?.find((r) => {
		if (typeof r === "function") {
			return r(value) != true
		}
		return false
	})

	if (typeof failedRule === "function") {
		const possibleErrorMessage = failedRule(value)

		if (typeof possibleErrorMessage === "string") {
			output.value = possibleErrorMessage
		}

		return true
	}

	return false
}
