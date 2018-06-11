import React from 'react'
import Property from '../../../components/home/productDetails/property'
import {connect} from 'react-redux'

class ProductDetails extends React.Component{
    render()
    {
        return <div>
                <Property type = "Name" value = "Rupesh Shrestha"/>
                <Property type = "Name" value = "Rupesh Shrestha"/>
        </div>
    }
}
function mapStateToProps(state){
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(ProductDetails);