let url = "ws://localhost:8080/live/auction"
var client = Stomp.client(url);

let connected = e => {
	console.log("opened socket")
	client.subscribe("/auction/1", e =>{
		console.log("Hello" + e)
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
