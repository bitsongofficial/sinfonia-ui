export const resolveIcon = (
	icon: string,
	width: number,
	height: number,
	iconSet = "icons"
) => {
	let path = "svguse:" + iconSet + ".svg#" + icon
	if (height && width) {
		path += `|0 0 ${width} ${height}`
	}
	return path
}
