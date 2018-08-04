import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import TileView from '../components/tile-view'
import Typography from '@material-ui/core/Typography'
import {fetchProducts, fetchEach, getAuctionDetails, getFavorites, fetchProduct, getCategories,fetchItemsFromCategory} from '../products'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List'
import Browse from '@material-ui/icons/Menu'
import Gallery from '@material-ui/icons/PhotoAlbum'
import Live from '@material-ui/icons/LiveTv'
import Upcoming from '@material-ui/icons/NewReleases'
import MyItems from '@material-ui/icons/Dashboard'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import {getSearched} from "../products";
import moment from 'moment'
import store, {
    updateFavorites
} from '../store'


const styles = (theme) =>({
    margin: {
        margin: theme.spacing.unit*5
    },
    list: {
        width: 250,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    right: {
        marginLeft: 'auto'
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
            upcoming: [],
            myItems: [],
            wonItems: [],
            forHighestBidder: [],
            search: [],
            searchValue: false,
            searchString: "",
            categories: [],
            fromCategory: [],
            left: false,
            categoryRender: false,
            recommendations: []
        }
    }
    componentDidMount() {
        let favoritesFromApi = []
        let user = store.getState().user.userId
        if(this.state.value === 5 ){
            this.setState({
                fromCategory: []
            })
        }
        getCategories()
            .then(response=>{
                this.setState({
                    categories: response
                })
            })
            .catch("err",console.log)

        getFavorites().then(res=>{
            store.dispatch(updateFavorites({favorites:res}))
        }).catch(console.log)

        getFavorites()
            .then(res=>{
                favoritesFromApi=res
                fetchProducts()
                    .then(fetchEach)
                    .then(gallery => {
                        let withFavoritesGallery = []
                        let favorites = []
                        let liveGallery = []
                        let upcomingGallery = []
                        let myItems = []
                        gallery.map(item=>{

                            let temp = false
                            let live = false
                            let ended = false
                            if(item.auction !== null){
                                getAuctionDetails(item.auction.auctionId)
                                    .then(res=>{
                                        let seller = res.seller.userId
                                        let eventDateTime=  moment(res.auctionDate+' '+res.auctionTime)
                                        let timeSlice = Number(res.auctionDuration)/60
                                        let duration_ = moment.duration(eventDateTime-moment())
                                        let duration=duration_._data
                                        let total_minutes = Number(Math.abs(Number(duration.hours))*60+Math.abs(Number(duration.minutes))+Math.abs(Number(duration.seconds/60)))
                                        let minutes = Math.floor(total_minutes)
                                        let seconds = Math.floor((total_minutes-minutes)*60)
                                        if(duration_ < 0) {
                                            if (total_minutes < timeSlice) {
                                                live = true
                                            }
                                            else{
                                                ended = true
                                            }
                                        }

                                        if(live){
                                            liveGallery.push({...item,state:'LIVE',color:'#77e27b'})

                                        }

                                        if(ended){
                                            if(seller == user){
                                                myItems.push({...item,isFavorite: temp,state:'ENDED',color:'#ea000a'})
                                            }
                                            withFavoritesGallery.push({...item,isFavorite: temp,state:'ENDED',color:'#ea000a'})
                                        }
                                        else{
                                            if(live){
                                                if(seller == user){
                                                    myItems.push({...item,isFavorite: temp,state:'LIVE',color:'#77e27b'})
                                                }
                                                withFavoritesGallery.push({...item,isFavorite: temp,state:'LIVE',color:'#77e27b'})
                                            }
                                            else{
                                                if(seller == user){
                                                    myItems.push({...item,isFavorite: temp,state:'ON AUCTION',color:'#abacff'})
                                                }
                                                upcomingGallery.push({...item,isFavorite: temp,state:'ON AUCTION',color:'#abacff'})
                                                withFavoritesGallery.push({...item,isFavorite: temp,state:'ON AUCTION',color:'#abacff'})
                                            }

                                        }

                                    })
                            }



                        })

                        this.setState({gallery:withFavoritesGallery,favorites:favorites,liveGallery: liveGallery,upcoming:upcomingGallery,myItems:myItems})

                    })
                    .catch(console.log)
            })

    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
            value: 5,
            searchValue: false
        });
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){
        const {classes} = this.props
        const {value} = this.state
        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem disabled>Categories</ListItem>
                    {this.state.categories.map((category, key) => {
                            return <ListItem button onClick={()=>{
                                fetchItemsFromCategory(category.categoryId)
                                    .then(fetchEach)
                                    .then(gallery => {
                                        let favorites = []
                                        gallery.map(item => {
                                            let temp = false
                                            let live = false
                                            let ended = false
                                            let res = item.auction
                                            if(res !== null){
                                                let timeSlice = Number(res.auctionDuration)/60
                                                let eventDateTime=  moment(res.auctionDate+' '+res.auctionTime)
                                                let duration_ = moment.duration(eventDateTime-moment())
                                                let duration=duration_._data
                                                let total_minutes = Number(Math.abs(Number(duration.hours))*60+Math.abs(Number(duration.minutes))+Math.abs(Number(duration.seconds/60)))
                                                let minutes = Math.floor(total_minutes)
                                                let seconds = Math.floor((total_minutes-minutes)*60)
                                                if(duration_ < 0) {

                                                    if (total_minutes < timeSlice) {
                                                        live = true
                                                    }
                                                    else{
                                                        ended = true
                                                    }
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
                                        })
                                        console.log("fAV",favorites)
                                        this.setState({fromCategory:favorites,categoryRender: true})
                                    })
                            }} key = {key} >{category.categoryName}</ListItem>
                        }
                    )
                    }
                </List>
            </div>
        );
        return (
            <div>
                <AppBar position="sticky" style={{opacity: 1}} elevation="0">
                    <Toolbar>
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Gallery" icon = {<Gallery/>} href="#basic-tabs"/>
                        <Tab label="Live" icon = {<Live/>}href="#basic-tabs" />
                        <Tab label="Upcoming Auctions" icon = {<Upcoming/>}href="#basic-tabs" />
                        <Tab label="My Items" icon = {<MyItems/>}href="#basic-tabs" />
                        <Tab label="Categories" icon = {<Browse/>}href="#basic-tabs" />

                    </Tabs>
                    <TextField placeholder="Search" onChange={(event)=>{
                        this.setState({
                            searchString: event.target.value
                        })
                    }} className={classes.right}/>
                        <IconButton variant="contained" color="secondary"  onClick={()=>{
                            this.setState({
                                categoryRender: false
                            })
                            if(this.state.searchString.length > 0){
                                getSearched(this.state.searchString)
                                    .then(fetchEach)
                                    .then(gallery => {
                                        let favorites = []
                                        gallery.map(item => {
                                            let temp = false
                                            let live = false
                                            let ended = false
                                            let res = item.auction
                                            if(res !== null){
                                                let timeSlice = Number(res.auctionDuration)/60
                                                let eventDateTime=  moment(res.auctionDate+' '+res.auctionTime)
                                                let duration_ = moment.duration(eventDateTime-moment())
                                                let duration=duration_._data
                                                let total_minutes = Number(Math.abs(Number(duration.hours))*60+Math.abs(Number(duration.minutes))+Math.abs(Number(duration.seconds/60)))
                                                let minutes = Math.floor(total_minutes)
                                                let seconds = Math.floor((total_minutes-minutes)*60)
                                                if(duration_ < 0) {

                                                    if (total_minutes < timeSlice) {
                                                        live = true
                                                    }
                                                    else{
                                                        ended = true
                                                    }
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
                                        })
                                        console.log("fAV",favorites)
                                        this.setState({search:favorites,searchValue: true,value: 5})
                                    })
                            }
                            else{
                                this.setState({
                                    search: [],searchValue: false,value:5
                                })
                            }



                        }}><Search/>
                        </IconButton>
                    </Toolbar>

                </AppBar>
                {value === 0 && <TileView items={this.state.gallery} basePath={"/product/"}/>}
                {value === 1 && <TileView items={this.state.liveGallery} basePath={"/product/"}/>}
                {value === 2 && <TileView items={this.state.upcoming} basePath={"/product/"}/>}
                {value === 3 && <TileView items={this.state.myItems} basePath={"/product/"}/>}
                {value === 4 && <div>
                    <Drawer open={true} onClose={this.toggleDrawer('left', false)}>
                        <div>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            {sideList}

                        </div>
                        </div>
                    </Drawer>
                </div>}
                {this.state.searchValue && value === 5 &&<div><Typography style={{margin: 5,fontWeight: "lighter"}}variant="display2" align="center">Search Results</Typography><TileView items={this.state.search} basePath={'/product/'}/></div>}
                {value === 5 && this.state.categoryRender && <div><Typography style={{margin: 5,fontWeight: "lighter"}}variant="display2" align="center">Search Results</Typography><TileView items={this.state.fromCategory} basePath={"/product/"}/></div>}
                <TileView items={this.state.recommendations} title="Recommendations" basePath={"/product/"}/>
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