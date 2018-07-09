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
import {Redirect } from 'react-router-dom'
import {USER_TOKEN} from '../../definitions/index'

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
           
        }
    }
    componentDidMount(){
        let user = JSON.parse(localStorage.getItem(USER_TOKEN))
        if(user){
            axios.get(`http://localhost:8080/organizers/${user.id}/events`,{crossDomain:true})
            .then(response => {
                this.setState({
                    events: response.data
                })
            }

            )
      }
    }
    
  

  render(){
    const { classes } = this.props;
    const {events} = this.state
        return (
            <div style={{marginLeft: "20px",marginRight: "20px"}}>
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
                    <TableCell >Status</TableCell>
                    <TableCell>Organizer's Name</TableCell>
                    <TableCell >StartDate</TableCell>
                    <TableCell >EndDate</TableCell>
                    <TableCell >Duration(days)</TableCell>
                    <TableCell >Participants</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {events.map((n,i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell>{n.eventName}</TableCell>
                        
                        {(n.accepted == true) && (
                            <TableCell>Approved</TableCell>
                        )}
                        {(n.accepted == false) && (
                            <TableCell>Pending</TableCell>
                        )}
                        <TableCell>{n.organizer.name}</TableCell>
                        <TableCell >{n.eventStartDate}</TableCell>
                        <TableCell >{n.eventEndDate}</TableCell>
                        <TableCell >{n.eventDurationInDays}</TableCell>
                        <TableCell >{n.expectedNumberOfParticipants}</TableCell>
                    </TableRow>
                    
                    );
                })}
                <br/>
                <br/>
                <br/>
                </TableBody>
            </Table>
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
           
            </div>
        );
    }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);