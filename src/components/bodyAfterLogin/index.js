import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
    return{
        root: {
            flex: 1,
            margin: theme.spacing.unit
        }
    }

}

class Body extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return <div>

        </div>

    }

}
Body.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Body);