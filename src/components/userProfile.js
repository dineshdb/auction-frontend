import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Close from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Location from '@material-ui/icons/LocationOn'
import Phone from '@material-ui/icons/Phone'
import Email from '@material-ui/icons/Email'
import User from '@material-ui/icons/VerifiedUser'
const styles= (theme)=>{
    return {
        margin: {
            margin: theme.spacing.unit
        },
        paper: {
            marginLeft: theme.spacing.unit*4,
            marginRight: theme.spacing.unit*4,
            marginTop: theme.spacing.unit,
            width: 500,
            height: 500
        },
        close:{
            marginLeft: theme.spacing.unit*60
        },
        avatar: {
            margin: 10,
            marginLeft:20
        },
        bigAvatar: {
            width: 140,
            height: 140,
            color:'#fff',
            backgroundColor: '#4351aa'
        },
        purpleAvatar: {
            margin: 10,
            color: '#fff',
            backgroundColor: "#4351aa",
        },
        typo:{
            margin: theme.spacing.unit,
            color: '#11a6e5',
            fontWeight: 'lighter',
        }
    }
}
class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open: true
        }
    }
    componentDidMount(){
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleOpen = () => {
        this.setState({ open: true });
    };

    render(){
        const {userObject,classes,handleClose} = this.props
        console.log("USER",userObject)
        console.log("STATE",this.state.open)
        return<div >
            <Dialog  open = {this.state.open} onClose={this.handleClose}>
           <DialogContent>
                <Close
                    className={classes.close}
                    onClick={this.handleClose}
                />
               <Grid container spacing={24}>
                   <Grid item xs={4} xl={4} sm={4} lg={4}>
                       <Avatar className={classNames(classes.avatar, classes.bigAvatar)}><User/>{userObject.userName}</Avatar>
                   </Grid>
                   <Grid item xs={8} xl={8} sm={8} lg={8}>
                       <Typography className={classes.typo}>
                           <Email/>{userObject.userEmail}
                       </Typography>
                       <Typography className={classes.typo}>
                           <Phone/>{userObject.userPhone}
                       </Typography>
                       <Typography className={classes.typo}>
                          <Location/> {userObject.userAddress}
                       </Typography>
                   </Grid>
               </Grid>




           </DialogContent>
            </Dialog>

        </div>
    }
}
UserProfile.PropTypes = {
    userObject: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(UserProfile)