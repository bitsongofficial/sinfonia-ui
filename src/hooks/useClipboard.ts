import { copyToClipboard } from "quasar"
import { notifyError, notifySuccess } from "@/common"

const useClipboard = () => {
	const onCopy = async (link?: string) => {
		if (link) {
			try {
				await copyToClipboard(link)
				notifySuccess("Success", "Text copied to the clipboard")
			} catch (error) {
				console.error(error)
				notifyError("Error", "Something went wrong, please try again later")
			}
		}
	}

	return { onCopy }
}

export default useClipboard
