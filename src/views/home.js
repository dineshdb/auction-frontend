import React from 'react'
import HomeBar from '../components/appBar/index'
import {USER_TOKEN} from '../components/../definitions/index'
import Body from '../components/bodyAfterLogin/index'
import Footer from '../components/footer/index'
import SearchBar from '../components/searchbar/index'
import HomeImage from '../assets/images/home.jpg'
import ProductsBody from '../components/body/index'
class Home extends React.Component
{
    
    render(){
        return (
            <div>
                <HomeBar/>
                <SearchBar/>
                <Body/>
                <ProductsBody/>
                <Footer/>
        
        
            </div>
            )
    }
}
export default Home;