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
import Grid from '@material-ui/core/Grid'
import Search from './searchBar'
import Home from '@material-ui/icons/Home'

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
    pad:{
        paddingTop: 10
    }
};


class LoginBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           isLoggedIn: false
        }
    }


    render() {
        const {classes} = this.props;
        if(!this.state.isLoggedIn){
            return (
                <div >
                    <AppBar position="static">
                        <Toolbar>
                            <Grid container spacing = {24} spacing={40}>
                                <Grid item xs={1}>
                                <IconButton color="inherit" aria-label="Menu">
                                    <MenuIcon/>
                                </IconButton>
                                </Grid>
                                <Grid item xs={1}>
                                
                                <Button className={classes.pad} color= "inherit">
                                    <Link to="/" className={classes.pad}>Home
                                    </Link>
                                </Button>
                                
                                </Grid>
                                <Grid item xs={1}>
                                <Button color="inherit">
                                    <Link to="/" className={classes.pad}>About</Link>
                                </Button>
                                </Grid>
                                <Grid item xs={7}>
                                <Search/>
                                </Grid>
                                <Grid item xs = {1}>
                                <Button color="inherit" style={{paddingTop: 15}} >
                                    <Link to="/login">Login</Link></Button>
                                </Grid>
                                <Grid item xs={1}>
                                <Button color="inherit">
                                <Link to="/signup" style = {{

                                }}>Sign Up</Link></Button>
                                </Grid>
                                </Grid>
                        </Toolbar>
                    </AppBar>


                </div>
            );
        }
        else{
            return (
                 <div >
                    
                    <AppBar position="static">
                        <Toolbar>
                            <Grid container spacing = {24} spacing={40}>
                                <Grid item xs={1}>
                                <IconButton color="inherit" aria-label="Menu">
                                    <MenuIcon/>
                                </IconButton>
                                </Grid>
                                <Grid item xs={1}>
                                
                                <Button className={classes.pad} color= "inherit">
                                    <Link to="/" className={classes.pad}>Home
                                    </Link>
                                </Button>
                                
                                </Grid>
                                <Grid item xs={1}>
                                <Button color="inherit">
                                    <Link to="/" className={classes.pad}>About</Link>
                                </Button>
                                </Grid>
                                <Grid item xs={7}>
                                <Search/>
                                </Grid>
                                <Grid item xs = {2}>
                                <Button color="inherit" style={{paddingTop: 15}} >
                                    <Link to="/login">Logout</Link></Button>
                                </Grid>
                                
                                </Grid>
                        </Toolbar>
                    </AppBar>


                </div>
            )
        }
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
