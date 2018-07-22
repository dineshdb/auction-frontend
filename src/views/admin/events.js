import React from 'react'
import HomeBar from '../../components/appBar/index'
import Events from '../../components/admin/events/index'
import Footer from '../../components/footer/index'

class Home extends React.Component
{
    
    render(){
        return (
            <div>
            <HomeBar/>
            
            <Events/>
        
           <Footer/>

        
            </div>
            )
    }
}
export default Home;