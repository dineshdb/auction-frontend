import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
import axios from 'axios'
import Button from '@material-ui/core/Button'

import {Redirect } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    color: "#b4ce84"
  },
  table: {
    minWidth: 700,
  },
});

class Events extends React.Component {

    constructor(props){
        super(props)
        this.state={
            events: [],
            approvalStatus: []
           
        }
    }
    componentDidMount(){
        let temp = []
        axios.get('http://localhost:8080/events',{crossDomain:true})
        .then(response => {
       
            response.data.map((n)=>{
                temp.push(n.accepted)
            })
            this.setState({
                events: response.data,
                approvalStatus: temp
            })
        }
        )
    }
    handleClick(){

    }
    handleApprove = (id) => event => {
   
        axios.put(`http://localhost:8080/admins/1/events/${id}`)
        return<Redirect to = "/" />
    }
    handleDelete = (id) => event => {
     
        axios.delete(`http://localhost:8080/events/${id}`)
        return <Redirect to = "/" />
    }
   

  

  render(){
    const { classes } = this.props;
    const {events} = this.state
        return (
            <div style={{marginLeft: "20px",marginRight: "20px"}}>
            <form onSubmit={this.handleClick.bind(this)}>
            <Paper className={classes.root}>
            <Typography
                        align="center"
                        variant="display3"
                        >
                        Events
                        </Typography>
            <Table className={classes.table}>
              
                <TableHead >
                <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell >Status</TableCell>
                    <TableCell >Organizer's Username</TableCell>
                    <TableCell >Organizer's Email</TableCell>
                    <TableCell >StartDate</TableCell>
                    <TableCell >EndDate</TableCell>
                    <TableCell >Duration(days)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {events.map((n,i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell>{n.eventName}</TableCell>
                       {(n.accepted == true) && (
                            <TableCell>
                                <IconButton variant="contained" color="secondary" 
                                 onClick={this.handleDelete(n.eventId)} 
                                   >
                                    <Clear/>
                                </IconButton>
                            
                            </TableCell>
                        )}
                        {(n.accepted ==  false) && (
                            <TableCell>
                                <Grid container spacing={24}>
                              
                                <Grid item xs={6}>
                                    <IconButton variant="contained" 
                                       onClick={this.handleApprove(n.eventId)}  ><Check/></IconButton>
                                </Grid>
                                
                                <Grid item xs= {6}>
                                    <IconButton variant="contained" color="secondary" 
                                     onClick={this.handleDelete(n.eventId)}  
                                   >

                                    <Clear/></IconButton>
                                </Grid>
                              
                                </Grid>
                            </TableCell>
                        )}
                        
                        {(n.accepted == true) && (
                            <TableCell>Approved</TableCell>
                        )}
                        {(n.accepted == false) && (
                            <TableCell>Pending</TableCell>
                        )}
                        {(n.organizer !== null) && ( 
                        <TableCell >{n.organizer.organizerName}</TableCell>
                        )
                        }
                        {(n.organizer !== null) && ( 
                        <TableCell >{n.organizer.organizerEmail}</TableCell>
                        )
                        }
                        {(n.organizer === null) && ( 
                            
                        <TableCell ></TableCell>
                             )
                        }
                          {(n.organizer === null) && ( 
                            
                            <TableCell ></TableCell>
                                 )
                            }
                       
                        <TableCell >{n.eventStartDate}</TableCell>
                        <TableCell >{n.eventEndDate}</TableCell>
                        <TableCell >{n.eventDurationInDays}</TableCell>
                    </TableRow>
                    
                    );
                })}
                <br/>
                <br/>
                <br/>
                </TableBody>
            </Table>
            <Button variant="large" variant = "contained" type="Submit" >Submit</Button>
            </Paper>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
           </form>
            </div>
        );
    }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);