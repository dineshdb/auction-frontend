let url = "ws://localhost:8080/live/auction"
var client = Stomp.client(url);


let connected = e => {
	client.subscribe("/auction/watch", e =>{
		console.log("Auction going live of id" + JSON.parse(e.body))
		let body = JSON.parse(e.body)
		console.log("DATA",body)


	})
    client.subscribe("/auction/highestBid", e =>{
        console.log("Highest bid info" + JSON.stringify(e.body))

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
