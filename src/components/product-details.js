import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
let styles = {

}

class ProductDetails extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render(props){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Typography
                    style={{
                        fontSize: "30px",
                        color: "black",
                        fontWeight: "lighter"
                    }}
                    align="center"
                >Product Details </Typography>
            </div>
        )
    }
}

ProductDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetails);