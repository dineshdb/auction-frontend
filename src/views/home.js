import React from 'react'
import HomeBar from '../components/appBar/index'
import {USER_TOKEN} from '../components/../definitions/index'
import Body from '../components/bodyAfterLogin/index'
import Footer from '../components/footer/index'
import SearchBar from '../components/searchbar/index'
import HomeImage from '../assets/images/home.jpg'
class Home extends React.Component
{
    
    render(){
        return (
            <div>
            <HomeBar/>
                <SearchBar/>
            <Body/>
                <img src = {HomeImage} style={{width: "100%",height: "100%"}}/>
                <Footer/>
        
        
            </div>
            )
    }
}
export default Home;