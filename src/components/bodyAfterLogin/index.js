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

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            createEventButton: false

        }

    }
    handleNewEvent(){
        this.setState({
            createEventButton: true
        })
    }
    render(){
        const {classes} = this.props
        if(!this.state.createEventButton){
            return (
                    <div>
                       
                        <br/>
                    
                    <Grid container spacing={24}>
                    <Grid item xs={12}>
                   
                    </Grid>
                   
                   
                    <Grid item xs={12}>
                    <Link to = "/newEvent">
                        <Button 
                         variant = "contained" 
                        size = "large" 
                        className = {classes.button} 
                        onClick = {this.handleNewEvent.bind(this)}
                        >
                        Create New Event
                    </Button>
                    </Link>
                    </Grid>
                    <Grid item xs={4}>
                    <Link to = "/showEvents">
                        <Button 
                         variant = "contained" 
                        size = "large" 
                        className = {classes.button} 
                        onClick = {this.handleNewEvent.bind(this)}
                        >
                        Show Events
                    </Button>
                    </Link>
                    </Grid>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                   
                    </Grid>
                
                   

                </div>
                
                
            )
        }
        else{
            return (
                <EventForm/>
            )
        }
    }

}
Body.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(STYLES)(Body);