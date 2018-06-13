import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {logIn} from './actions'
import LoginDialogBox from './loginDialogBox'
import {connect} from 'react-redux'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class LoginBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logInClicked: false
        }
    }

    handleLogin(event) {
        this.setState({
            logInClicked: this.props.dispatch(logIn(true))
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Title
                        </Typography>
                        <Button onClick={this.handleLogin.bind(this)} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <LoginDialogBox/>


            </div>
        );
    }
}
LoginBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        userStatus: state.userStatus

    }
}
export default connect(mapStateToProps)(withStyles(styles)(LoginBar))
