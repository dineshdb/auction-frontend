import React from 'react'
import SearchBar from '../components/searchbar/index'
import Product from '../components/productTemplate'
import axios from 'axios'
import {USER_TOKEN} from "../definitions/index";
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import UserProducts from '../components/userProducts'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import store from '../store'
import {connect} from 'react-redux'
import {productsAdd} from "../store";

const styles = (theme) =>{
    return {
        margin:{
            margin: theme.spacing.unit*6
        }
    }
}


class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            products:[],
            pages: 0,
            frames: [],
            count: 0
        }
    }

    componentDidMount() {
        let productsWithImages = []
        let count = 0
        if (localStorage.getItem(USER_TOKEN)) {
            if (!this.props.products) {
                console.log("no data")
                axios({
                    method: 'GET',
                    url: `http://localhost:8080/items`,
                    headers: {
                        'Authorization': JSON.parse(localStorage.getItem(USER_TOKEN)).header
                    }
                }).then((response) => {
                    let productIds = response.data
                    let length = productIds.length / 4
                    this.setState({
                        pages: length
                    })
                    let tempFrames = []
                    for (let i = 0; i < this.state.pages; i++) {
                        tempFrames.push(i)
                    }
                    this.setState({
                        frames: tempFrames
                    })
                    productIds.map((id) => {

                            axios({
                                method: 'GET',
                                url: `http://localhost:8080/items/${id}`,
                                headers: {
                                    'Authorization': JSON.parse(localStorage.getItem(USER_TOKEN)).header
                                },
                            }).then((response) => {
                                let product = response.data
                                axios({
                                    method: 'GET',
                                    url: product.image,
                                    headers: {
                                        'Authorization': JSON.parse(localStorage.getItem(USER_TOKEN)).header
                                    },
                                    responseType: 'blob'
                                }).then((response) => {
                                    console.log("in progress")
                                    const url = window.URL.createObjectURL(new Blob([response.data]))
                                    product = {...product, image: url}
                                    productsWithImages.push(product)
                                    if(productsWithImages.length === length*4){
                                        this.setState({
                                            products: productsWithImages
                                        })
                                        this.props.dispatch(productsAdd(productsWithImages))

                                    }



                                })


                            }).catch(err => {
                                console.log("HEY ERROR", err)
                            })
                        }
                    )
                })


            }
            else{
                let num = this.props.products.length
                let tempFrames = []
                for (let i = 0; i < num; i++) {
                    tempFrames.push(i)
                }
                this.setState({
                    frames: tempFrames
                })
                this.setState({
                    products: this.props.products,

                })
            }
        }
    }

    render(){
        const {classes} = this.props
        return (

            <div>
                <SearchBar/>
                <Paper
                    style={{
                        color: "white"
                    }}
                    className={classes.margin}
                    square
                    elevation={0}
                >{
                    this.state.frames.map((frame)=>{
                        return(
                            <Toolbar>
                                {
                                    this.state.products.map((product,key)=>{
                                        if((key >= frame*4) && (key < (frame+1)*4)){
                                            return (
                                                <Product
                                                    title={product.itemName}
                                                    bid={product.startingBid}
                                                    date={product.date}
                                                    image={product.image}
                                                    id={product.itemId}

                                                />
                                            )
                                        }



                                    })
                                }
                            </Toolbar>
                        )
                    })
                }

                </Paper>

            </div>
            )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired
};
function mapStateToProps(state){
    return{
        products: state.products
    }

}
export default connect(mapStateToProps)(withStyles(styles)(Home));