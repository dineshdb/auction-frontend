let url = "ws://localhost:8080/live/auction"
var client = Stomp.client(url);

let connected = e => {
		client.subscribe("/auction/1", e =>{
		console.log("Auction going live of id:" + e.body)
	})
}
let error = e => {
	console.log("error " + e)
}

let token = 'This end point is open currently'
let headers = {
	'Authorization' : token
}

client.connect(headers, connected, error)
