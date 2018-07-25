import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Home from './views/home'
import Login from './components/login/index'
import SignUp from './components/signup/index'
import {Redirect} from 'react-router-dom'
import PageNotFound from './views/404'
import {USER_TOKEN} from './definitions/index'
import {MuiThemeProvider} from '@material-ui/core/styles'
import AddProduct from './components/add-product'
import theme from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
//TODO REMOVE
//
import Product from './components/productTemplate'
//
import ProductDetails from './components/product-details'
import Notifications from './components/notifications'
import Cart from './components/cart'
import UserProfile from './components/user-profile'

import AppBar from './components/app-bar'
class App extends React.Component {
    constructor(props){
        super(props)
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
                <Route path = "product/:id" component = {ProductDetails}/>
                <Route path = "/error" exact strict render = {() => <PageNotFound errorMessage = "Invalid page" />}/>
                <Route path = "/profile/:id" component = {UserProfile} />

                <Route path = "/login" exact strict render = {() => {
                    let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                    console.log("user",userToken)
                    if(!userToken){
                        return <Login/>
                    } else {
                            return <Redirect to = "/" />
                    }
                }}
                />
                <Route path = "/signup" exact strict render = {() => {
                        let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <SignUp/>
                        } else{
                            return <Redirect to = "/" />
                        }
                    }}
                />
                    <Route path = "/add" exact strict render = {() => {
                        let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <Login/>
                        }
                        else{
                            return <AddProduct/>
                        }
                         }
                    }
                    />

                </div>
            </Router>
            </MuiThemeProvider>
        )
    }
}

export default App;
