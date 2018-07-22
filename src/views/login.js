import React from 'react'
import HomeBar from '../components/appBar/index'
import Footer from '../components/footer/index'
import LoginBar from '../components/login/index'

class Login extends React.Component
{
    render(){
        return (
            <div>
               
            <HomeBar/>
            <LoginBar/>
            <Footer/>
            </div>
            )
}
}
export default Login;