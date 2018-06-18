import React from 'react'
import LoginBar from '../components/appBar/index'

class ProductDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            product: []

        }
        
    }
    componentDidMount(){
        


    }
    render(){
        return (
            <div>
                <LoginBar/>

            </div>

        )
    }
}
export default ProductDetails;