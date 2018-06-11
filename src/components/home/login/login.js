import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';

export default class Login extends Component {
    render() {
        return (
            <Dialog
                open >
                <DialogTitle>Login</DialogTitle>
                <DialogContent
                >
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
                    <Button onClick={this.props.toggleLogin} color="primary">
                        Login
                    </Button>
                    <Button onClick={this.props.toggleLogin} color="primary">
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
