import { Notify, Dark } from "quasar"
import { resolveIcon } from "./resolvers"
import Spinner from "@/components/Spinner"
import { NotificationPosition } from "@/types"

function notify(
	message: string,
	secondaryMessage: string,
	success,
	position: NotificationPosition = "top",
	timeout = 10000
) {
	const background = !Dark.isActive
		? "bg-notification-background-light light"
		: "bg-notification-background"

	return Notify.create({
		group: false,
		classes: `${background} rounded-20 q-pt-20 q-pb-18 q-px-30 min-w-440`,
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
		timeout,
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
	position: NotificationPosition = "top",
	timeout = 0
) {
	return notify(message, secondaryMessage, undefined, position, timeout)
}
