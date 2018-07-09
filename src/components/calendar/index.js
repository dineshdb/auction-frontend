import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {DATES} from '../../definitions/index'
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Rooms from '../event/dateInfo'
import {ROOMS} from '../../definitions/index'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
var newDates = []

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment(),
      dates: [],
      duration: [],
      chosenDates: [],
      dialogOpen: false,
      count: 0,
     
    };
  }
 

  handleFinal(){
     
    const {dates,duration} = this.state
    var temp = []
    dates.map((date,i)=>{
      var date = date.toDate()
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
     
      
      if(newDates[i] !== undefined){
        temp.push({
          year: year,
          month: month,
          day: day,
          matrix: newDates[i].chosenTimeSlots,
        })
  
        localStorage.setItem(DATES,JSON.stringify(temp))
      }
   
     

          
      }
      )
    
   
    }
    
  handleClose = () =>{
    var temp = JSON.parse(localStorage.getItem(ROOMS))
 
    if(temp){
      newDates.push(temp)
      localStorage.removeItem(ROOMS)
    }
    
    this.setState({
      dialogOpen: false
    })
   }
  render() {
      var dateComponents = []
      for(var i=0;i< this.props.days;i++){
            
        dateComponents.push(i)
      }
     
      
    
    return <div>
         
          {dateComponents.map((x,i)=> {
          
            return <div>
               <Grid container spacing = {24}>
                <Grid item xs={8}>

                  <DatePicker
                      style = {{marginTop: "50"}}
                      selected={this.state.dates[i]}
                      onChange={(date)=>{
                      
                      this.setState({
                        dialogOpen: true,
                        count: this.state.count+1
                        
                      })
                      let obj = {}
                      var tempDate = date.toDate()
                      var year = tempDate.getFullYear()
                      var month = tempDate.getMonth()
                      var day = tempDate.getDate()
                      obj = {
                        year: year,
                        month: month,
                        day: day
                      }
                      localStorage.setItem('TEMP_DATE',JSON.stringify(obj))
                       var temp = this.state.dates
                       temp[i] = date
                       this.setState({
                         dates: temp
                       })
            
                     }}
                      dateFormat="LL"
                      placeholderText="Select date"
                  />  
                  </Grid>
                 
                  <Dialog
                    fullScreen
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                  >
                     <AppBar style={{backgroundColor: "#b4ce84"}}>
                      <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                          <CloseIcon />
                        </IconButton>
                        <Button 
                        variant="contained"
                        onClick={this.handleClose}
                        >
                        Save
                        </Button>
                        
                      </Toolbar>
                    </AppBar>
                    <br/>
                    <br/>
                    <Rooms/>
                    
                  </Dialog>
                    
                  <Grid item xs = {4}>
                  
                    </Grid>
                    </Grid>
                    
                    {
                      (this.state.count === this.props.days) && (this.handleFinal())
                      
                    }
             </div>
          })}
      </div>
    
    
  }
}
export default Calendar;