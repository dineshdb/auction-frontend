import React from 'react'
import LoginBar from '../components/appBar/index'
import {connect} from 'react-redux'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      paddingRight: 100,
      paddingLeft: 100,
      marginTop: theme.spacing.unit * 3,
    
    }),
  });

class ProductDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            product: {}

        }
        
    }
    componentWillMount(){
        this.setState({
            id: Number(this.props.match.params.id)
        })
        
    }
    componentDidMount(){
        var temp = this.props.products.find((x) => x.id===this.state.id)
        this.setState({
            product: temp
        })
    }
    
   
    render(){
       const {classes} = this.props
        return (
            <div>
                <LoginBar/>
                <Paper className={classes.root}>
                    <Typography variant="headline" component="h3">
                    Name
                    </Typography>
                    <Typography component="p">
                        {this.state.product.Name}
                    </Typography>
                    <br/>
                    <Typography variant="headline" component="h3">
                    Category
                    </Typography>
                    <Typography component="p">
                        {this.state.product.Category}
                    </Typography>
                    <br/>
                    <Typography variant="headline" component="h3">
                    Description
                    </Typography>
                    <Typography component="p">
                        {this.state.product.Description}
                    </Typography>
                    <br/>
                    <Typography variant="headline" component="h3">
                    Bid Price
                    </Typography>
                    <Typography component="p">
                        {this.state.product.Bid}
                    </Typography>
                    <br/>
                    
                </Paper>
            </div>

        )
    }
}
ProductDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  }
function mapStateToProps(state){
    return {
        products: state.productStore,
    }
}
export default connect(mapStateToProps)(withStyles(styles)(ProductDetails))