import React from 'react'
import LogoBar from '../components/logobar/index'
import Footer from '../components/footer/index'
import SellProductForm from '../components/sellProductForm/index'

class Sell extends React.Component
{
    render(){
        return (
            <div>
                <LogoBar/>
                <SellProductForm/>

            </div>
        )
    }
}
export default Sell;