import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'

const styles = (theme) => {
    root: {
        flex: 1
    }
}

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showUsers: false,
            showEvents: false

        }

    }
    handleUsers(){
        this.setState({
            showUsers: true
        })
    }
    handleEvents(){
        this.setState({
            showEvents: true
        })
    }
    render(){
       const{classes} = this.props
        if(!this.state.showUsers){
            return (
                    <div>
                       
                        <br/>
                    
                    <Grid container spacing={24}>
                    <Grid item xs={12}>
                   
                    </Grid>
                   
                   
                    <Grid item xs={12}>
                    <Link to = "/organizers">
                        <Button 
                         variant = "contained" 
                        size = "large" 
                        className = {classes.button} 
                        onClick = {this.handleUsers.bind(this)}
                        >
                        Show Organizers
                    </Button>
                    </Link>
                    </Grid>
                    <Grid item xs={4}>
                    <Link to = "/events">
                        <Button 
                         variant = "contained" 
                        size = "large" 
                        className = {classes.button} 
                        onClick = {this.handleEvents.bind(this)}
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
                <h1>he</h1>
            )
        }
    }

}
Body.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Body);