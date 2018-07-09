import React from 'react'
import HomeBar from '../components/appBar/index'
import Footer from '../components/footer/index'
import NewEvent from '../components/event/index'
class Event extends React.Component
{
    
    render(){
        return (
            <div>
               
            <HomeBar/>
            <NewEvent/>
            <Footer style={{sticky: bottom}}/>
            </div>
            )
}
}
export default Event;