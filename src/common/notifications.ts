import { Notify } from "quasar"
import { resolveIcon } from "./resolvers"
import Spinner from "@/components/Spinner"
import { NotificationPosition } from "@/types"

function notify(
	message: string,
	secondaryMessage: string,
	success,
	position: NotificationPosition = "top"
) {
	return Notify.create({
		message:
			'<div class="q-mr-15"><p class="fs-16 text-weight-medium' +
			(secondaryMessage ? " q-mb-10" : "") +
			'">' +
			message +
			'</p><p class="fs-14 opacity-40">' +
			secondaryMessage +
			"</p></div>",
		spinner: success === undefined ? Spinner : false,
		icon: success ? resolveIcon("success", 32, 32) : resolveIcon("error", 30, 30),
		position,
		timeout: 20500,
		actions: [{ label: "" }],
	})
}

export function notifySuccess(
	message: string,
	secondaryMessage = "",
	position: NotificationPosition = "top"
) {
	return notify(message, secondaryMessage, true, position)
}

export function notifyError(
	message: string,
	secondaryMessage = "",
	position: NotificationPosition = "top"
) {
	return notify(message, secondaryMessage, false, position)
}

export function notifyLoading(
	message: string,
	secondaryMessage = "",
	position: NotificationPosition = "top"
) {
	return notify(message, secondaryMessage, undefined, position)
}
