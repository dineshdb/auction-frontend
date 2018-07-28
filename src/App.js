import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Home from './views/home'
import Login from './components/login/index'
import SignUp from './components/signup/index'
import {Redirect} from 'react-router-dom'
import PageNotFound from './views/404'
import {MuiThemeProvider} from '@material-ui/core/styles'
import AddProduct from './components/add-product'
import theme from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import ProductDetails from './components/product-details'
import Notifications from './components/notifications'
import Cart from './components/cart'
import UserProfile from './components/user-profile'

import store, {subscribeAuctionAction} from './store'


import AppBar from './components/app-bar'
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOnline : store.getState().isLoggedIn
        }
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({
                isOnline: store.getState().isLoggedIn
            })
        })

        store.dispatch(subscribeAuctionAction(1))
    }

    render(props) {

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
            <Router>
                <div >
                <AppBar />
                <Route path = "/" exact strict component  = { Home }/>
                <Route path = "/notifications" exact strict component  = { Notifications }/>
                <Route path = "/cart" exact strict component  = { Cart }/>
                <Route path = "/product/:id" component = {ProductDetails}/>
                <Route path = "/error" exact strict render = {() => <PageNotFound errorMessage = "Invalid page" />}/>
                <Route path = "/profile/:id" component = {UserProfile} />
                <Route path = "/login" exact strict render = {() => {
                    return this.state.isOnline? (<Redirect to="/" />) : (<Login/>)
                }}/>
                <Route path = "/signup" exact strict render = {() => {
                   return this.state.isOnline? (<Redirect to="/" />) : (<SignUp/>)
                }}/>
                <Route path = "/add" exact strict render = {() => {
                   return !this.state.isOnline? (<Login to="/login" />) : (<AddProduct/>)
                }}/>
               </div>
            </Router>
            </MuiThemeProvider>
        )
    }
}

export default App;
