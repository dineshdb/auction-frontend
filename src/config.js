// This proxy server is for development only. Use more powerful proxy server like nginx for deployment.

let siteUrl = window.location.host	// localhost:3000 or sankalpa.org
let apiBase = `localhost:8080`

let wsBaseUrl = `ws://${siteUrl}`

export const baseUrl = `/`
export const apiUrl = `/api`
export const WebSocketUrl = `${wsBaseUrl}/api/live/auction`
export const WebsiteName = "Bidsteller.com"
