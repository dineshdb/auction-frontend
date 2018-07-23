import React from 'react'
import SearchBar from '../components/searchbar/index'
import ProductList from '../components/product-list'

class Home extends React.Component {
    render(){
        return (
            <div>
                <SearchBar/>
                <ProductList/>
            </div>
            )
    }
}
export default Home;