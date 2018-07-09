import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {ROOMS} from '../../definitions/index'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import axios from 'axios'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    
  },
  table: {
    minWidth: 700,
  },
});



class Rooms extends React.Component {

    constructor(props){
        super(props)
        this.state={
            initialTimeSlots: [],
            chosenTimeSlots: [],
            description: [],
            total: 0,
            costs: [],
            rooms:[],
            names: [],
            empty: false
        }
        
    }
    componentDidMount(){
     
      var newTemp = []
      
        for(let i=0;i<8;i++){
          var innerTemp = []
          for(let j=0;j<15;j++){
            innerTemp.push(false)
          }
          newTemp.push(innerTemp)
        }
        const fetchedDate = JSON.parse(localStorage.getItem('TEMP_DATE'))
        
       
        axios.get('http://localhost:8080/rooms',{crossDomain: true})
        .then((response) => {
          this.setState({
            rooms: response.data
          })
        
        })
        .then(()=>{
          const temp = []
          const names = []
          const {rooms} = this.state
         
          for(var i=0;i<rooms.length;i++){
            const data = "Category :"+rooms[i].roomCategory+" Capacity :"+rooms[i].roomCapacity+" Cost Per Hour :Rs. "+rooms[i].costPerHour+" Cost Per Day :Rs. "+rooms[i].costPerDay+" Cost Per Unit :Rs. "+rooms[i].costPerUnit
            temp.push(data)
            names.push(rooms[i].roomName)
            
          }
         
          this.setState({
            description: temp,
            names: names
            
          })
         
           
        }

        )
        .then(
          axios.post('http://localhost:8080/eventSections/findByDate',fetchedDate,{crossDomain: true})
          .then(((response)=>{
            this.setState({
              chosenTimeSlots: response.data
            })
            localStorage.setItem("initial",(JSON.stringify({
              bools: response.data})))
            }))
          .catch((err) => {
          
          this.setState({
            chosenTimeSlots: newTemp
          })
          localStorage.setItem("initial",JSON.stringify({
            bools: newTemp}))
          })
        )
          
        }
      
      
       

        

       
     
     
    handleCheckbox = (i,j) => event => {
      var temp1 = this.state.chosenTimeSlots
      var temp2 = this.state.chosenTimeSlots[i]
      temp2[j] = event.target.checked
      temp1[i] = temp2
      this.setState({
        chosenTimeSlots: temp1
      })

    }
    handleSave(){
      const {chosenTimeSlots} = this.state
      var initial = JSON.parse(localStorage.getItem('initial')).bools
    
      const temp1 = []
     
      for(var i=0;i<8;i++){
        var temp2 = []
        for(var j=0;j<this.state.rooms.length;j++){
          if(chosenTimeSlots[i][j] === initial[i][j]){
            temp2.push(false)
          }
          else{
            temp2.push(true)
          }
        }
        temp1.push(temp2)
      }
      localStorage.removeItem('temp')
  
    localStorage.setItem(ROOMS,JSON.stringify(
      {
        chosenTimeSlots: temp1,
       
      }
    ))

    }
  

  render(){
    const { classes } = this.props;
    const {chosenTimeSlots} = this.state
   
    const timeSlots = [
    "9:00 - 10:00 A.M",
    "10:00 - 11:00 A.M",
    "11:00 - 12:00 P.M",
    "12.00 P.M - 1:00 P.M",
    "1.00 P.M - 2:00 P.M",
    "2.00 P.M - 3:00 P.M",
    "3.00 P.M - 4:00 P.M",
    "4.00 P.M - 5:00 P.M"
  ]
    

    const temp = chosenTimeSlots
    
        return (
          <div>
            
            <Paper className={classes.root}
            
            >
            <Typography 
              variant="display1"
              >Done</Typography>
            <Checkbox onChange={this.handleSave.bind(this)}>
              
              </Checkbox>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>
                      Rooms/Timeslice
                    </TableCell>
                   {
                     
                     this.state.description.map((x,i) => {
                      const {names} = this.state
                       return (
                       <Tooltip title={x} style={{fontSize: "100px"}}>
                         <TableCell> 
                            {names[i]}
                         </TableCell>
                         </Tooltip>
                       )
                     })
                   }
                </TableRow>
                </TableHead>
                <TableBody>
                 
                  {temp.map((x,i) => {
                  
                    return (
                    <TableRow>
                      <TableCell>{timeSlots[i]}</TableCell>
                      {x.map((y,j)=>{
                        return(
                          <TableCell><Checkbox checked={temp[i][j]}onChange = {this.handleCheckbox(i,j)} disabled={temp[i][j]}/></TableCell>
                        )
                      })}
                      </TableRow>

                  )
                  })}

               </TableBody>
               </Table>
            </Paper>
            </div>
        );
    }
}

Rooms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rooms);