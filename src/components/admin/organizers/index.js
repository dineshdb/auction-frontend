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

class Organizers extends React.Component {

    constructor(props){
        super(props)
        this.state={
            users: []
        }
    }
    componentDidMount(){
    
       axios.get('http://localhost:8080/organizers')
       .then(response=>{
           this.setState({
               users: response.data
           })
       })
       
    }

  render(){
    const { classes } = this.props;
    const {users} = this.state
        return (
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell >Organizer Name</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Phone</TableCell>
                    <TableCell >Address</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((n,i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        {n.userName}
                        </TableCell>
                        <TableCell >{n.organizerName}</TableCell>
                        <TableCell >{n.organizerEmail}</TableCell>
                        <TableCell >{n.organizerPhone}</TableCell>
                        <TableCell >{n.organizerAddress}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
             {/* <Button onClick = {this.fetchData(1)}>
            Next
            </Button>  */}
            </Paper>
        );
    }
}

Organizers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Organizers);