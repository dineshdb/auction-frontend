import React from 'react'
import SearchBar from '../components/searchbar/index'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach} from '../products'
const styles = (theme) =>({

})
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            products:[],
            pages: 0,
            frames: [],
            count: 0,
            user: null,
            favorites: []
        }
    }
    componentDidMount() {
        fetchProducts()
        .then(fetchEach)
        .then(favorites => this.setState({favorites}))
        .catch(console.log)
    }

    render(){
        const {classes} = this.props
        return (
            <div>
                <SearchBar/>
                <TileView items={this.state.favorites} basePath={"/product/"}/>
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