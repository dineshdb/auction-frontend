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
    render() {
        return (
            <div>
                    <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
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
                        <Button color="primary">
                            <Link to="/" style = {{


                            }}>Cancel</Link>
                        </Button>
                        <Button color="primary">
                            <Link to="/">
                            Sign Up
                            </Link>
                        </Button>
                    </DialogActions>
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
