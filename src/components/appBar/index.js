import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'

import {Icon, IconButton} from '@material-ui/core'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Notifications from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Search from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TextField from '@material-ui/core/TextField'
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
    link:{
        textDecoration: "none"
    },

    typoButton: {
        fontSize: "15px",
        fontWeight: "lighter",
        color: "#ffffff"
    }
};

const Site = "BidStellar.com"
class HomeBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOnline: false,
            userId: "",
            fireHome: false,
            userName: ""
        }
    }
    componentDidMount(){
        let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        if(userToken){
            this.setState({
                isOnline: userToken.isOnline,
            })
        }
    }
    handleLogOut(){
        let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        if(userToken){
           localStorage.removeItem(USER_TOKEN)
           this.setState({
               isOnline: false,
           })
        }
        this.fireHome()
        
    }
    fireHome(){
        this.setState({
            fireHome: true,
            anchorEl: null
        })
    }
    handleSearch(event){
        this.setState({
            searchName: event.target.value
        })
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state
        const open = Boolean(anchorEl);
        return (
                <div >
                    <AppBar position="static" className={classes.root}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <Icon>menu</Icon>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                BidSteller.com
                            </Typography>
                            {this.state.isOnline && (
                                <div>
                                    <Button color="inherit"><Notifications/></Button>
                                    <Button> <ShoppingCart/> </Button>

                                    <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                    >
                                    <AccountCircle />
                                    </IconButton>
                                    <Menu
                                    id="menu-appbar"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    onClose={this.handleClose}
                                    anchorEl={anchorEl}
                                    open={open}
                                    >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={ ()=> {
                                                localStorage.removeItem(USER_TOKEN)
                                                this.handleClose()
                                                this.setState({
                                                    isOnline: false
                                                })
                                            }
                                            }>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}
                            {   !this.state.isOnline && (
                                <div>
                                    <Link to="/signup">
                                        <Button
                                            color="secondary"
                                            className={classes.typoButton}
                                            >Register
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button color="secondary"
                                            className={classes.typoButton}>
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            )}                           

                        </Toolbar>
                    </AppBar>
                </div>
        )
    }
}
HomeBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
    }
}
export default connect(mapStateToProps)(withStyles(styles)(HomeBar))
