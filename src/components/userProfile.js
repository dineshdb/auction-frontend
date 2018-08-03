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
            marginLeft: theme.spacing.unit*100
        },
        avatar: {
            margin: 10,
            marginLeft:150
        },
        bigAvatar: {
            width: 200,
            height: 200,
        },
        purpleAvatar: {
            margin: 10,
            color: '#fff',
            backgroundColor: "#4351aa",
        },
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
               <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>AB</Avatar>
                <Typography>
                    {userObject.userName}
                </Typography>
                <Typography>
                    {userObject.userEmail}
                </Typography>
                <Typography>
                    {userObject.userAddress}
                </Typography>
                <Typography>
                    {userObject.userPhone}
                </Typography>


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