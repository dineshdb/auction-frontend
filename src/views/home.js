import React from 'react'
import SearchBar from '../components/searchbar/index'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach,getAuctionDetails,getFavorites} from '../products'
import Typography from '@material-ui/core/Typography'
import store from '../store'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Favorite from '@material-ui/icons/Favorite'
import Gallery from '@material-ui/icons/Image'
const styles = (theme) =>({
    typo: {
        fontSize: "30px",
        fontWeight: "lighter"
    },
    margin: {
        margin: theme.spacing.unit*5
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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
            gallery: [],
            value:0
        }
    }
    componentDidMount() {
        let favoritesFromApi = []
        getFavorites()
            .then(res=>{
                console.log("res,",res)
                favoritesFromApi=res
                fetchProducts()
                    .then(fetchEach)
                    .then(gallery => {
                        let withFavoritesGallery = []
                        let favorites = []
                        gallery.map(item=>{
                            let temp = false
                            favoritesFromApi.map((id)=>{
                                if (item.auction == id){
                                    temp=true
                                    favorites.push({...item,isFavorite: true})


                                }
                            })
                            withFavoritesGallery.push({...item,isFavorite: temp})

                        })

                        this.setState({gallery:withFavoritesGallery,favorites:favorites})
                        console.log("FAVORITES",this.state)

                    })
                    .catch(console.log)
            })

    }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){
        const {classes} = this.props
        const {value} = this.state
        console.log("STORE",store.getState())
        return (
            <div>
                <SearchBar/>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Favorites" icon={<Favorite/>} href="#basic-tabs"/>
                        <Tab label="Gallery" icon = {<Gallery/>} href="#basic-tabs"/>
                        <Tab label="Live" href="#basic-tabs" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TileView items={this.state.favorites} basePath={"/product/"}/>}
                {value === 1 && <TileView items={this.state.gallery} basePath={"/product/"}/>}
                {value === 2 && <TileView items={this.state.gallery} basePath={"/product/"}/>}





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