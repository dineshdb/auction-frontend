import React from 'react'
import SearchBar from '../components/searchbar/index'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach,getAuctionDetails,fetchFavorites} from '../products'
import Typography from '@material-ui/core/Typography'
import store from '../store'
const styles = (theme) =>({
    typo: {
        fontSize: "50px",
        fontWeight: "lighter"
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
            this.setState({gallery})
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
                <Typography align="center" className={classes.typo}>
                        Favorites
                    </Typography>
                <TileView items={this.state.favorites} basePath={"/product/"}/>
                <Typography align="center" className={classes.typo}>
                        Gallery
                    </Typography>
                <TileView items={this.state.gallery} basePath={"/product/"}/>
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