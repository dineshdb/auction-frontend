import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach,getAuctionDetails} from '../products'
import {getFavorites} from "../products";
import store,{updateFavorites} from '../store'
import moment from 'moment'

let styles = theme => ({

})
class Favorites extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            favorites: []
        }
    }
    componentDidMount(){
        let favoritesFromApi = []
        getFavorites().then(res=>{
            console.log("FAVS",res)
            store.dispatch(updateFavorites({favorites:res}))
//            res.forEach(subscribeAuction)
        }).catch(console.log)
        getFavorites()
            .then(res=> {
                favoritesFromApi = res
                fetchProducts()
                    .then(fetchEach)
                    .then(gallery => {
                        let favorites = []
                        gallery.map(item => {
                            favoritesFromApi.map((id) => {
                                if(item.auction !== null){
                                    if (item.auction.auctionId == id) {
                                        let temp = false
                                        let live = false
                                        let ended = false
                                        let res = item.auction
                                        let eventDateTime=  moment(res.auctionDate+' '+res.auctionTime)
                                        let duration_ = moment.duration(eventDateTime-moment())
                                        let duration=duration_._data
                                        let total_minutes = Number(Math.abs(Number(duration.hours))*60+Math.abs(Number(duration.minutes))+Math.abs(Number(duration.seconds/60)))
                                        let minutes = Math.floor(total_minutes)
                                        let seconds = Math.floor((total_minutes-minutes)*60)
                                        if(duration_ < 0) {

                                            if (total_minutes < 11) {
                                                live = true
                                            }
                                            else{
                                                ended = true
                                            }
                                        }

                                        if(live){

                                            favorites.push({...item,state:'LIVE',color:'#77e27b'})

                                        }

                                        if(ended){

                                            favorites.push({...item,isFavorite: temp,state:'ENDED',color:'#ea000a'})
                                        }
                                        else{
                                            if(live){
                                                favorites.push({...item,isFavorite: temp,state:'LIVE',color:'#77e27b'})
                                            }
                                            else{
                                                favorites.push({...item,isFavorite: temp,state:'ON AUCTION',color:'#ff74ad'})
                                            }

                                        }

                                    }
                                }

                            })
                        })
                        this.setState({favorites:favorites})


                    })
            })

    }
    render(props){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <TileView items={this.state.favorites} basePath={"/product/"}/>
            </div>
        )
    }
}

Favorites.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Favorites);