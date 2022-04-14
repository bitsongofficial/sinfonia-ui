import axios from "axios"

const externalClient = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
})

export { externalClient }
