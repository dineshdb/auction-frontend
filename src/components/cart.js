import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import TileView from './tile-view'
let styles = theme => ({

})
class Cart extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render(props){
        const {classes} = this.props
        let data = {
            items : [
                {
                    id: 1,
                    title : "Scissors",
                    quantity: 3,
                    price: 540,
                    image: '/img/home.jpg'
                },
                {
                    id: 1,
                    title : "Scissors",
                    quantity: 3,
                    price: 540,
                    image: '/img/home.jpg'
                },
                {
                    id: 1,
                    title : "Scissors",
                    quantity: 3,
                    price: 540,
                    image: '/img/home.jpg'
                },
                {
                    id: 1,
                    title : "Scissors",
                    quantity: 3,
                    price: 540,
                    image: '/img/home.jpg'
                },
                {
                    id: 1,
                    title : "Scissors",
                    quantity: 3,
                    price: 540,
                    image: '/img/home.jpg'
                },
                {
                    id: 1,
                    title : "Scissors",
                    quantity: 3,
                    price: 540,
                    image: '/img/home.jpg'
                },
                ]
        }
        return (
            <div className={classes.root}>
                <TileView items={data.items} basePath={"/product/"}/>
            </div>
        )
    }
}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);