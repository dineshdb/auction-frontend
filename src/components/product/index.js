import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {mountProduct} from './actions/index'
import mountedProducts from '../../reducers/productsMounted';
import {Link} from 'react-router-dom'

const imagePath = './../../assets/images/a.jpg'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 1.5,

  }),
});

class Products extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            localProducts:[],
            path:""
            }
        }
        componentDidMount(){
            this.setState({
                localProducts: this.props.products.slice(0,4),
            })

        }
    componentWillReceiveProps(){
        console.log("inside products",this.props.index)
        this.setState({
            localProducts: this.props.products.slice(this.props.index,this.props.index+4),
        })
    }
    
    


  render(){
      const {classes} = this.props
    return (
        
        <div>
            <Grid container spacing={24}>
                {this.state.localProducts.map((product)=>
                
                <Grid key = {product.id} item xs={3}>
                <Link to = {`/productDetails/${product.id}`} >
                <Paper className={classes.root} elevation={0} square style={{marginBottom: 0
                }}>
                    <Divider/>
                    
                    <img src = {imagePath} style = {{height: 20}}></img>
                   <Grid container>
                       <Grid item xs = {12}>
                       {product.Name} 
                       </Grid>
                    </Grid>
                
                    <br/>
                    <Grid container>
                        <Grid item xs = {12}>
                        {product.Bid} 
                        </Grid>
                    </Grid>
                    <Divider/>
                    
                </Paper>
                </Link>
                </Grid>
                
            )}
            </Grid>
    </div>
    )
}
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        products: state.productStore,
        newProducts: state.productsMounted
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Products));