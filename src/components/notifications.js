import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
let styles = {

}

class Notifications extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render(props){
        const {classes, match,products} = this.props
        console.log(match)
        console.log("CHECKING REDUX STORE",products)
        return (
            <div className={classes.root}>
                <Typography
                    style={{
                        fontSize: "30px",
                        color: "black",
                        fontWeight: "lighter"
                    }}
                    align="center"
                >Notifications</Typography>
            </div>
        )
    }
}

Notifications.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired
};
function mapStateToProps(state){
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Notifications));