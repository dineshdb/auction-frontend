
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect } from 'react-router-dom'
import Calendar from '../calendar/index'
import Divider from '@material-ui/core/Divider'
import MultipleDatePicker from 'react-multiple-datepicker'
import {DATES} from '../../definitions/index'
import {ROOMS} from '../../definitions/index'
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      color: "#b4ce84"
    },
  });

class EventForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
          eventName: "",
          eventDescription: "",
          dates: [],
          days: 0,
          chosenRooms: {},
          totalCost: "",
          participants: "",
          submit: false,
          fireCalendar: false,
        }
    }
        
        handleEventName(event){
           
            this.setState({
                eventName: event.target.value
            })
        }
        handleEventDescription(event){
           
            this.setState({
                eventDescription: event.target.value
            }) 
        }
        handleDays(event){
            this.setState({
                days: Number(event.target.value)
            }
            )
        }
    
           
        handleParticipants(event){
           
            this.setState({
                participants: event.target.value
            }) 
        }
        handleSubmit(event){
            event.preventDefault()
            const {eventName,eventDescription,participants,dates} = this.state
            let data = localStorage.getItem(DATES)
            
            if(data){
                let temp = JSON.parse(data)
            
          
                if(eventName.length > 0 && eventDescription.length > 0 ){
                    let user = JSON.parse(localStorage.getItem(USER_TOKEN))
                    let rooms = temp
                    
                    let postingData = {
                        event: {
                            eventName: eventName,
                            eventDescription: eventDescription,
                            expectedNumberOfParticipants: participants,
                            eventDurationInDays: this.state.days,
                            
                        },
                        roomMatrixList: temp
                       
                       

                    }
                 
                    
                    console.log("Data is",postingData)
                    
                    axios.post(`http://localhost:8080/organizers/${user.id}/eventInfo`,postingData,{crossDomain: true})
                    .then(response => {
                        console.log(response,"response")
                    })
                    
                this.setState({
                    fireRedirect: true
                })
                
            }
        }
           
        }
        
        
  
           

      
        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40, marginBottom: 40}}>
                    <Grid container spacing = {24}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={5}>
                    <Paper className = {classes.root} elevation={6} square>
                    <Typography
                        variant = "display1" component = "h6">
                        Create Event<br/><br/>

                        </Typography>
                    <form  onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                    <TextField
                            name="EventName"
                            margin="dense"
                            type="text"
                            placeholder="Event Name"
                            onChange={this.handleEventName.bind(this)}
                            fullWidth
                            label="Event Name"
                        />
                    </div>
                    <div>
                    <TextField
                            name="Event Description"
                            margin="dense"
                            type="text"
                            placeholder="Description"
                            onChange={this.handleEventDescription.bind(this)}
                            fullWidth
                            label="Description"
                        />
                    </div>
                    <div>
                    <TextField
                            name="Participants"
                            margin="dense"
                            type="text"
                            placeholder="Participants"
                            onChange={this.handleParticipants.bind(this)}
                            fullWidth
                            label="Participants"
                        />
                    </div>
                    <div>
                    <TextField
                            name="Total Days"
                            margin="dense"
                            type="text"
                            placeholder="Total Days"
                            onChange={this.handleDays.bind(this)}
                            fullWidth
                            label="Total days"
                        />
                    </div>
                
            
                    <div>
                        <br/>
                    </div>
                    <Grid container spacing = {24}>
                    <Grid item xs = {7}>
                     <Typography
                        variant = "button" component = "h7">
                        Date And Time
                        </Typography>
                    </Grid>
                    
                    <Grid item xs = {3}>
                       
                    </Grid>
                    <Grid item xs = {2}>
                      
                    </Grid>
                    
                    </Grid>
                    <div>
                        <br/>
                    </div>
                    <Divider
                    />
                    <div style = {{marginTop: 20}}>
                    <Calendar days = {this.state.days} />
                    </div>
                    <div>
                        <br/>
                        <br/>
                    </div>
                    <div>
                    <Divider
                    />
                    </div>
                    <Grid container spacing={24} style={{marginTop: 10}}
                        >
                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs = {3}>
                            <Link to = "/">
                            <Button  
                            type="cancel" 
                            color="inherit" 
                        
                            style = {{marginBottom: 15,marginTop: 5}}
            
                            >
                            Cancel
                            
                            </Button>
                            </Link>
                       
                        </Grid>
                        <Grid item xs={4}>
                            <Button 
                            variant = "contained" 
                            type="submit" 
                            color="inherit" 
                        
                            style = {{marginBottom: 15,marginTop: 5}}
            
                            >
                            Submit
                            
                            </Button>
                        
                        <Grid>
                    </Grid>
                </Grid>
                </Grid>
                    </form> 
                   
               
                    </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    
                    </Grid>  
                
                {this.state.fireRedirect && (
                    <Redirect to = "/" />
                )}
               
                </div>

            )
        }
    
}
EventForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state){
    return {
        newUsers: state.newUsers
    }
}
export default connect(mapStateToProps)(withStyles(styles)(EventForm));



