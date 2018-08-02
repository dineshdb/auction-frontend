import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach} from '../products'
import {getFavorites} from "../products";
import store from '../store'

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
        getFavorites()
            .then(res=> {
                favoritesFromApi = res
                fetchProducts()
                    .then(fetchEach)
                    .then(gallery => {
                        let favorites = []
                        gallery.map(item => {
                            favoritesFromApi.map((id) => {
                                if (item.auction.auctionId == id) {
                                    favorites.push({...item, isFavorite: true})
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