import React from 'react'
import HomeBar from '../../components/appBar/index'
import HomeImage from '../../assets/images/home.jpeg'
import Footer from '../../components/footer/index'
import SearchBar from '../../components/searchbar/index'
class Home extends React.Component
{
    render(){
        return (
            <div style = {{backgroundImage: HomeImage}}>
                <HomeBar/>
                <SearchBar/>

                </div>
        )
    }
}
export default Home;