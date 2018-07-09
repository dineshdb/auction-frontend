import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventForm from '../event/index';
import {Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {STYLES} from '../../definitions/index'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ImageUploader from 'react-images-upload';

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