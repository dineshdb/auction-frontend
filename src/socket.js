import {WebSocketUrl} from './config'

let Stomp = window.Stomp

var wsClient = Stomp.client(WebSocketUrl);
let connected = e => {}
let error = e => {
	console.log("error " + e)
}
let headers = {

}
wsClient.connect(headers, connected, error)

export default wsClient