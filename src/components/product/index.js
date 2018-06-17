import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class PaperSheet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products:[]
            }
        }

  render(){
      const {classes} = this.props

    return (
        <div>
        <Paper className={classes.root} elevation={3}>
            <ul style={{ }}>
                <Divider/>
                <li> {this.props.products[0].Name}</li>
                <Divider/>
                <li> {this.props.products[0].Category}</li>
                <Divider/>
                <li> {this.props.products[0].Description}</li>
                <Divider/>
                <li> {this.props.products[0].Bid}</li>
                <Divider/>
                
                
                
            </ul>

        </Paper>
        </div>
    )
}
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        products: state.productStore
    }
}
export default connect(mapStateToProps)(withStyles(styles)(PaperSheet));