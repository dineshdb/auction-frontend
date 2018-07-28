import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TileView from '../components/tile-view'
import {fetchProducts, fetchEach} from '../products'
import store from '../store'

let styles = theme => ({

})
class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            favorites: []
        }
    }
    componentDidMount(){
        fetchProducts()
            .then(fetchEach)
            .then(favorites => this.setState({favorites}))
            .catch(console.log)
    }
    render(props){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <TileView items={this.state.favorites} basePath={"/product/"}/>
            </div>
        )
    }
}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);