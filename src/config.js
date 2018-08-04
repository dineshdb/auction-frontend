let siteUrl = window.location.host	// localhost:3000 or sankalpa.org
let apiBase = `localhost:8080`

let wsBaseUrl = `ws://${siteUrl}`

export const baseUrl = `http://${siteUrl}`
export const apiUrl = `http://${apiBase}`
export const WebSocketUrl = `${wsBaseUrl}/live/auction`
export const WebsiteName = "Bidsteller.com"
