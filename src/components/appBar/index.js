import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {logInButton} from './actions/logIn'
import {searchButton} from "./actions/search";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
            logInClicked: false,
            searchClicked: false
        }
    }

    handleLogin() {
        this.setState({
            logInClicked: this.props.dispatch(logInButton(true))
        })
    }
    handleSearch() {
        this.setState({
            searchClicked: this.props.dispatch(searchButton(true))
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
                            Auction
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <SearchIcon onClick = {this.handleSearch.bind(this)} />
                        </IconButton>
                        <Button onClick={this.handleLogin.bind(this)} color="inherit">
                            <Link to="/login" style = {{

                            }}>Login</Link></Button>
                    </Toolbar>
                </AppBar>


            </div>
        );
    }
}
LoginBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        appBarStatus: state.appBarStatus

    }
}
export default connect(mapStateToProps)(withStyles(styles)(LoginBar))
