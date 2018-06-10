import React from 'react'
import Property from '../../../components/home/productDetails/property'
import {connect} from 'react-redux'

class ProductDetails extends React.Component{
    render()
    {
        return <div>
            {this.props.products.map((product) => {

                    <Property type = {product.Name} value = {product.Bid}/>

                })}
        </div>
    }
}
function mapStateToProps(state){
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(ProductDetails);