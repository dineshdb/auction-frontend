import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Home from './views/home'
import PublicHome from './views/public/home'
import Login from './views/login'
import SignUp from './views/signup'
import {Redirect} from 'react-router-dom'
import NewEvent from './views/newEvent'
import PageNotFound from './views/404'
import {USER_TOKEN} from './definitions/index'
import AdminHome from './views/admin/index'
import Events from './views/admin/events'
import UserEvent from './views/events'
import Organizers from './views/admin/users'

class App extends React.Component {
    constructor(props){
        super(props)
    
    }

    render() {
        return (
            <Router>
                <div >
                    <Route path = "/" exact strict render = {() => {
                        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        console.log("User token is ",userToken)
                        if(!userToken){
                            return <PublicHome/>
                        }
                       
                        else{
                            if(userToken.userRole == "ORG"){
                                return <Home/>
                            }
                            if(userToken.userRole == "ADMIN"){
                                console.log("In home")
                                return <AdminHome/>
                            }
                        }
                    }
                }
                    />
                    <Route path = "/login" exact strict render = {() => {
                         var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                         if(!userToken){
                            return <Login/>
                        }
                        else{
                            return <Redirect to = "/" />
                        }
                    }

                        }
                    />
                      <Route path = "/admin" exact strict render = {() => {

                            return (
                                <AdminHome/>
                            )
                      }
                    
                    }
                
                    />
                    <Route path = "/signup" exact strict render = {() => {
                        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <SignUp/>
                        }
                        else{
                            return <Redirect to = "/" />
                        }
                    }

                        }
                    />
                    <Route path = "/error" exact strict render = {() => <PageNotFound errorMessage = "Invalid page" />}
                    />
                    <Route path = "/newEvent" render = {() => {
                        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <PublicHome/>
                        }
                       
                        else{
                            if(userToken.userRole == "ORG"){
                                return <NewEvent/>
                            }
                            if(userToken.userRole == "ADMIN"){
                                console.log("In home")
                                return  <Redirect to = "/" /> 
                                                         
                             }
                        }

                        }} />
                         <Route path = "/showEvents" render = {() => {
                        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <PublicHome/>
                        }
                       
                        else{
                            if(userToken.userRole == "ORG"){
                                return <UserEvent/>
                            }
                            if(userToken.userRole == "ADMIN"){
                                console.log("In home")
                                return  <Redirect to = "/" /> 
                                                         
                             }
                        }

                        }} />
                          <Route path = "/organizers" render = {() => {
                        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <PublicHome/>
                        }
                       
                        else{
                            if(userToken.userRole == "ORG"){
                                return <PublicHome/>
                            }
                            if(userToken.userRole == "ADMIN"){
                                return <Organizers/>
                                                         
                             }
                        }

                        }} />
                         <Route path = "/events" render = {() => {
                        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <PublicHome/>
                        }
                       
                        else{
                            if(userToken.userRole == "ORG"){
                                return <PublicHome/>
                            }
                            if(userToken.userRole == "ADMIN"){
                                return <Events/>
                                                         
                             }
                        }

                        }} />

                     
                    
                    
                </div>
            </Router>


        )
    }
}

export default App;
