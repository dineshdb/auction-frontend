import {WebSocketUrl} from './config'
import store, {
    auctionStartedAction, 
    newBid, 
    auctionEndedAction,
    updateAuctionListAction
} from './store'

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
        let msg = e.body
        console.log("auctionCallback",msg)
        if(msg.startsWith("bid")){
            let params = msg.split(' ')
            auctionBid(id, Number.parseInt(params[1]), Number.parseInt(params[2]))
        } else if( msg.startsWith("end")){
            auctionEnded(id)
        } else if(msg.startsWith("start")){
            auctionStarted(id)
        }
    }
}

export function subscribeAuction(id){
    if(wsClient.connected){
        let subscription = wsClient.subscribe(`/auction/${id}`, auctionCallback(id))
        console.log("HEY DATA ON SUBSCRIBE",subscription)
        if(subscriptions[id]){
            subscriptions[id].unsubscribe()
        }    
        subscriptions[id] = subscription
    } else {
        futureList.push(id)
        console.log("FUTURELIST",futureList)
    }
}

export function unsubscribeAuction(id){
    if(subscriptions[id]){
        subscriptions[id].unsubscribe()
        subscriptions[id] = null
    }
}

const auctionStarted = auctionId => {
    store.dispatch(auctionStartedAction(auctionId))
}

const auctionEnded = auctionId => {
    store.dispatch(auctionEndedAction(auctionId))
}

const auctionBid = (auctionId, userId, bidAmount) =>{
    store.dispatch(newBid({auctionId, userId, bidAmount}))
}