import React from 'react'
import HomeBar from '../components/appBar/index'
import Footer from '../components/footer/index'
import Events from '../components/userEvents/index'
class Event extends React.Component
{
    constructor(props){
        super(props)
        }
    render(){
        return <div>
            <HomeBar/>
            <Events/>
         
            <Footer/>
            </div>

    }
}

export default Event;