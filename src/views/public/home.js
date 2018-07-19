import React from 'react'
import HomeBar from '../../components/appBar/index'
import HomeImage from '../../assets/images/home.jpg'
import Footer from '../../components/footer/index'
import SearchBar from '../../components/searchbar/index'
import Body from '../../components/body/index'
class Home extends React.Component
{
    render(){
        return (
            <div style = {{backgroundImage: HomeImage}}>
                <HomeBar/>
                <SearchBar/>
                {/*<img src = {HomeImage} style={{*/}
                    {/*width: "100%",*/}
                    {/*height: "2"*/}
                {/*}}/>*/}
                <Body/>
                <Footer/>


                </div>
        )
    }
}
export default Home;