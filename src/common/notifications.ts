import { Notify, Dark } from "quasar"
import { resolveIcon } from "./resolvers"
import Spinner from "@/components/Spinner"
import { NotificationPosition } from "@/types"
import { disabledTransactions } from "@/configs/routes"

export function notify(
	message: string,
	secondaryMessage: string | undefined,
	link?: {
		text: string
		url: string
	},
	success?: boolean,
	position: NotificationPosition = "top",
	timeout = 5000
) {
	const background = !Dark.isActive
		? "bg-notification-background-light light"
		: "bg-notification-background"

	return Notify.create({
		group: false,
		classes: `${background} rounded-20 q-pt-20 q-pb-18 q-px-30 min-w-440`,
		message:
			'<div class="q-mr-15"><p class="fs-16 text-weight-medium' +
			(secondaryMessage != undefined || (link && !disabledTransactions)
				? " q-mb-10"
				: "") +
			'">' +
			message +
			"</p>" +
			(secondaryMessage
				? '<p class="fs-14 opacity-40' +
				  (link && !disabledTransactions ? " q-mb-10" : "") +
				  '">' +
				  secondaryMessage +
				  "</p>"
				: "") +
			(link && !disabledTransactions
				? '<a class="opacity-40 flex items-center hover:opacity-70 fs-14" target="_blank" href="' +
				  link.url +
				  '"><span class="q-mr-6">' +
				  link.text +
				  '</span><svg class="s-8" viewBox="0 0 10 10"><use xlink:href="/icons.svg#external"></use></svg></a>'
				: "") +
			"</div>",
		spinner: success === undefined ? Spinner : false,
		icon: success ? resolveIcon("success", 32, 32) : resolveIcon("error", 30, 30),
		position,
		timeout,
		actions: [{ label: "" }],
	})
}

export function notifySuccess(
	message: string,
	secondaryMessage: string | undefined = undefined,
	link?: { text: string; url: string },
	position: NotificationPosition = "top"
) {
	return notify(message, secondaryMessage, link, true, position)
}

export function notifyError(
	message: string,
	secondaryMessage: string | undefined = undefined,
	link?: { text: string; url: string },
	position: NotificationPosition = "top"
) {
	return notify(message, secondaryMessage, link, false, position)
}

export function notifyLoading(
	message: string,
	secondaryMessage: string | undefined = undefined,
	link?: { text: string; url: string },
	position: NotificationPosition = "top",
	timeout = 0
) {
	return notify(message, secondaryMessage, link, undefined, position, timeout)
}
