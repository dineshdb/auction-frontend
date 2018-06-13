import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import {logIn} from "./actions";

class LoginDialogBox extends React.Component {
    constructor(props){
        super(props)
        this.state={
            open: false
        }
    }

    handleClose(event){
        this.setState({
            open: this.props.dispatch(logIn(false))
        })


    }
    render() {
        return (
            <div>

                <Dialog
                    open={this.props.userStatus.loggedIn}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
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
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        userStatus: state.userStatus

    }
}
export default connect(mapStateToProps)(LoginDialogBox)
