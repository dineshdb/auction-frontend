import React from 'react'
import HomeBar from '../components/appBar/index'
import Footer from '../components/footer/index'
import SignUpForm from '../components/signup/index'
import Renderer from '../components/newUserDetails'
class SignUp extends React.Component
{
    handlSubmit(values){
        console.log(values)
    }
    render(){
        return (
            <div>
               
            <HomeBar/>
            <SignUpForm/>
            
            <Renderer/>
            <Footer/>
            </div>
            )
}
}
export default SignUp;