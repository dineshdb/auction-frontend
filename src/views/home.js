import React from 'react'
import SearchBar from '../components/searchbar/index'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach,getAuctionDetails,fetchFavorites} from '../products'
import store from '../store'
import Paper from '@material-ui/core/Paper'
const styles = (theme) =>({
    margin: {
        margin: theme.spacing.unit*5
    }
})
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            products:[],
            pages: 0,
            frames: [],
            count: 0,
            user: null,
            favorites: [],
            gallery: []
        }
    }
    componentDidMount() {
        fetchProducts()
        .then(fetchEach)
        .then(gallery => {
            let withFavoritesGallery = []
            let favorites = []
            gallery.map(item=>{
                let temp = false
                store.getState().favorites.map((id)=>{
                    if (item.auction == id){
                        temp=true
                        favorites.push({...item,isFavorite: true})

                    }
                })
                withFavoritesGallery.push({...item,isFavorite:temp})
            })

            this.setState({gallery:withFavoritesGallery,favorites})
            console.log("FAVORITES",store.getState())

        })
        .catch(console.log)
    }

    render(){
        const {classes} = this.props
        console.log("STORE",store.getState())
        return (
            <div>
                <SearchBar/>
                <TileView items={this.state.favorites} basePath={"/product/"} title="My Auctions" className={classes.margin}/>
                <TileView items={this.state.favorites} basePath={"/product/"} title="Favorites" className={classes.margin}/>
                <TileView items={this.state.gallery} basePath={"/product/"} title="Gallery" className={classes.margin}/>
            </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired
};
function mapStateToProps(state){
    return{
        products: state.products
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Home));