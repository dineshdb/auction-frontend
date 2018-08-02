import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach, fetchFavorites} from '../products'
import {getFavorites,getAuctionDetails} from "../products";
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
    componentDidMount() {
        let favoritesFromApi = []
        let favorites = []
        let user = store.getState().user.userId
        getFavorites().then(res=>{
            console.log("FAVS",res)
            store.dispatch(updateFavorites({favorites:res}))
//
        }).catch(console.log)
        getFavorites()
            .then(res=> {
                favoritesFromApi = res
                fetchProducts()
                    .then(fetchEach)
                    .then(gallery => {
                            let favorites = []
                            gallery.map(item => {
                                let temp = false
                                let live = false
                                let ended = false
                                console.log("found")
                                getAuctionDetails(item.auction.auctionId)
                                    .then(res => {
                                        let eventDateTime = moment(res.auctionDate + ' ' + res.auctionTime)
                                        let duration_ = moment.duration(eventDateTime - moment())
                                        let duration = duration_._data
                                        let total_minutes = Number(Math.abs(Number(duration.hours)) * 60 + Math.abs(Number(duration.minutes)) + Math.abs(Number(duration.seconds / 60)))
                                        let minutes = Math.floor(total_minutes)

                                        if (duration_ < 0) {

                                            if (total_minutes < 11) {
                                                live = true
                                            }
                                            else {
                                                ended = true
                                            }
                                        }

                                        if (ended) {

                                            favorites.push({
                                                ...item,
                                                isFavorite: temp,
                                                state: 'ENDED',
                                                color: '#ea000a'
                                            })
                                            console.log(favorites, 'favorite')

                                        }
                                        else {

                                            if (live) {
                                                favorites.push({
                                                    ...item,
                                                    isFavorite: temp,
                                                    state: 'LIVE',
                                                    color: '#77e27b'
                                                })
                                            }
                                            else {
                                                favorites.push({
                                                    ...item,
                                                    isFavorite: temp,
                                                    state: 'ON AUCTION',
                                                    color: '#ff74ad'
                                                })
                                            }


                                        }

                                    })

                            })

                                .catch(console.log)


                        }
                    )

            }
            )

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