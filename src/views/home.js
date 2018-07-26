import React from 'react'
import SearchBar from '../components/searchbar/index'
import Product from '../components/productTemplate'
import axios from 'axios'
import {USER_TOKEN} from "../definitions/index";
import Toolbar from '@material-ui/core/Toolbar'
import UserProducts from '../components/userProducts'
import Fs from 'fs'
import Path from 'path'
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
               let products = response.data
                console.log("first products",products)
                let productsWithImages = []
                products.map((product)=>{
                   if(product.image){
                       axios({
                           method: 'GET',
                           url: `http://localhost:8080/downloadFile/18_image.jpg`,
                           headers: {
                               'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
                           },
                           responseType: 'blob'
                       }).then((response)=>{
                            const url = window.URL.createObjectURL(new Blob([response.data]))
                           console.log("URL",url)


                       })
                   }
                   else{
                       productsWithImages.push(product)
                   }
                   }
                    )
                this.setState({
                    products: productsWithImages
                })

                console.log("PRODUCTS",productsWithImages)

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