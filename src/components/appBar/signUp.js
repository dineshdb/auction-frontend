import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import {signUpButton} from "./actions/signUp";
import {Link} from 'react-router-dom'

class SignUpDialogBox extends React.Component {
    constructor(props){
        super(props)
        this.state={
            open: false
        }
    }

    handleClose(){
        this.setState({
            open: false
        })


    }
    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign UPp</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            <Link to="/" style = {{


                            }}>Cancel</Link>
                        </Button>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            <Link to="/">
                            Sign Up
                            </Link>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
       appBarStatus: state.appBarStatus

    }
}
export default connect(mapStateToProps)(SignUpDialogBox)
