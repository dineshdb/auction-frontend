import React from 'react'
import HomeBar from '../../components/appBar/index'
import HomeImage from '../../assets/images/home.jpeg'
import Footer from '../../components/footer/index'
class Home extends React.Component
{
    render(){
        return (
            <div style = {{backgroundImage: HomeImage}}>
                <HomeBar/>
                <img src={HomeImage} style = {{
                    height: "100%",
                    width: "100%"
                }}/>
                <Footer/>
                </div>
        )
    }
}
export default Home;