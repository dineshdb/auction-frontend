import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {STYLES} from '../../definitions/index'


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
  
  export default withStyles(STYLES)(Body);