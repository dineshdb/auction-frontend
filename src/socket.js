import {WebSocketUrl} from './config'

let Stomp = window.Stomp
let subscriptions = {}
let futureList = []

let wsClient = Stomp.client(WebSocketUrl);

function subscribeFutures(futureList){
    let futures = futureList
    while(true){
        if(futures.length === 0){
            break;
        }
        console.log(futures.length)
        let item = futures.pop()
        subscribeAuction(item)
    }
}
let connected = e => {
    setTimeout(subscribeFutures, 2, futureList)
}
let error = e => {
	console.log("error " + e)
}
let headers = {

}
wsClient.connect(headers, connected, error)

export default wsClient

function auctionCallback(id){
    return e => {
        console.log(e)
    }
}

export function subscribeAuction(id){
    if(wsClient.connected){
        let subscription = wsClient.subscribe(`/auction/${id}`, auctionCallback(id))
        if(subscriptions[id]){
            subscriptions[id].unsubscribe()
        }    
        subscriptions[id] = subscription
    } else {
        futureList.push(id)
    }
}

export function unsubscribeAuction(id){
    if(subscriptions[id]){
        subscriptions[id].unsubscribe()
        subscriptions[id] = null
    }    
}

const auctionStarted = auctionId => {
    
}

const auctionEnded = auctionId => {

}

const auctionNewBid = (auctionId, bidAmount, userId) =>{

}