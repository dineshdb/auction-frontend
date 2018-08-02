import React from 'react'
import SearchBar from '../components/searchbar/index'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach,getAuctionDetails,getFavorites} from '../products'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Favorite from '@material-ui/icons/Favorite'
import Gallery from '@material-ui/icons/Image'
import Live from '@material-ui/icons/LiveTv'
import moment from 'moment'
import store, {
    subscribeAuctionAction,
    updateAuctionListAction,
    auctionStartedAction, updateFavorites
} from '../store'

const styles = (theme) =>({
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
            value:1,
            liveGallery: [],
            endToday: [],
            newToday: [],
            mine: [],
            value:0,
        }
    }
    componentDidMount() {
        let favoritesFromApi = []
        getFavorites().then(res=>{
            console.log("FAVS",res)
            store.dispatch(updateFavorites({favorites:res}))
//            res.forEach(subscribeAuction)
        }).catch(console.log)

        getFavorites()
            .then(res=>{
                console.log("res,",res)
                favoritesFromApi=res
                fetchProducts()
                    .then(fetchEach)
                    .then(gallery => {
                        let withFavoritesGallery = []
                        let favorites = []
                        let liveGallery = []
                        gallery.map(item=>{

                            let temp = false
                            let live = false
                            getAuctionDetails(item.auction.auctionId)
                                .then(res=>{
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
                                    }
                                    console.log("favoritesFromApi",favoritesFromApi)
                                    favoritesFromApi.map((id)=>{
                                        if (item.auction == id){
                                            temp=true
                                            favorites.push({...item,isFavorite: true})
                                        }
                                    })
                                    if(live){
                                        liveGallery.push({...item})
                                    }
                                    withFavoritesGallery.push({...item,isFavorite: temp})
                                })


                        })

                        this.setState({gallery:withFavoritesGallery,favorites:favorites,liveGallery: liveGallery})
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
                        <Tab label="Live" icon = {<Live/>}href="#basic-tabs" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TileView items={this.state.favorites} basePath={"/product/"}/>}
                {value === 1 && <TileView items={this.state.gallery} basePath={"/product/"}/>}
                {value === 2 && <TileView items={this.state.liveGallery} basePath={"/product/"}/>}

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