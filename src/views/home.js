import React from 'react'
import SearchBar from '../components/searchbar/index'
import Product from '../components/productTemplate'
import axios from 'axios'
import {USER_TOKEN} from "../definitions/index";
import Toolbar from '@material-ui/core/Toolbar'
import UserProducts from '../components/userProducts'
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            products:[]
        }
    }
    componentDidMount(){
        if(localStorage.getItem(USER_TOKEN)){
            axios({
                method: 'GET',
                url: `http://localhost:8080/items`,
                headers: {
                    'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
                }
            }).then((response)=>{
                this.setState({
                    products: response.data
                })
            })
        }

    }
    render(){
        return (
            <div>
                <SearchBar/>
                <Toolbar>
                {
                    this.state.products.map((product,key)=>{
                        if(key < 5)
                        return (
                            <Product
                                title={product.itemName}
                                bid={product.startingBid}
                                date={product.date}
                            />
                        )
                    })
                }
                </Toolbar>

            </div>
            )
    }
}
export default Home;