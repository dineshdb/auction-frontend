import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {USER_TOKEN} from '../definitions/index'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Icon, IconButton} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import {SIGN_OUT} from "../store";
import {Redirect} from 'react-router-dom'
import store from '../store'
import {getFavorites,userProfile} from "../products";
import UserProfile from '../components/userProfile'
const styles = theme => ({
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
    margin: {
        margin: theme.spacing.unit * 2,
    },
    badge: {
        margin: 1 * theme.spacing.unit
    }
});

const Site = "BidStellar.com"
class HomeBar extends React.Component {
    constructor(props){
        super(props)
        let state = store.getState()
        this.state = {
            isOnline: state.isLoggedIn,
            userId: "",
            fireHome: false,
            userName: "",
            favoritesCount: 0,
            showProfile: false,
            userData: {}
        }
    }
    componentDidMount(){
        let length = 0
        store.subscribe(()=> {
            let state = store.getState()
            getFavorites()
                .then(res => {
                    this.setState({
                        isOnline: store.getState().isLoggedIn,
                        favoritesCount: res.length
                    })
                })
        })

    }
    handleCloseProfile=()=>{
        this.setState({
            showProfile: false
        })
    }
    handleLogOut = () =>{
        store.dispatch({type: 'SIGN_OUT'})
        this.fireHome()        
    }
    fireHome = () =>{
        this.setState({
            fireHome: true,
            anchorEl: null
        })
    }
    handleSearch = (event) => {
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

    gotoHelp = () => {
        this.handleClose()
    }
    openProfile = () =>{
        let data = {}
        console.log("State",this.state)
        if(!this.state.showProfile){
            userProfile(store.getState().user.userId)
                .then(res=>{
                    this.setState({
                        showProfile: true,
                        userData: res
                    })
                })
        }
        else{
            this.setState({
                showProfile : false
            })
        }





    }
    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state
        const open = Boolean(anchorEl);

        
        return (
                <div >
                    <AppBar position="sticky" className={classes.root}>
                        <Toolbar>

                            
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                <Link to="/">
                                BidStellar
                                </Link>
                                </Typography>
                            
                            {(this.state.isOnline) && (
                                <div>
                                    <Link to="/add">
                                        <IconButton >
                                            <Icon style={{color: "black"}}>add</Icon>
                                        </IconButton>
                                    </Link>
                                    <Link to="/favs">
                                        <Badge className={classes.badge} badgeContent={this.state.favoritesCount} color="secondary">
                                            <Icon>favorite</Icon>
                                        </Badge>
                                    </Link>
                                    

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
                                    <MenuItem onClick={this.openProfile}>Profile</MenuItem>
                                    <MenuItem onClick={this.gotoHelp}> Help </MenuItem>
                                    <MenuItem onClick={ ()=> {
                                                this.props.dispatch({type: SIGN_OUT})
                                                this.handleClose()
                                                localStorage.removeItem(USER_TOKEN)
                                                this.setState({
                                                    fireHome: true
                                                })
                                            }
                                            }>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}
                            {   (!this.state.isOnline) && (
                                <div>
                                    <Link to="/signup">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            >Register
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button
                                            color="secondary"
                                            variant="outlined"
                                            >
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            )}                           

                        </Toolbar>
                    </AppBar>
                    {
                        this.state.fireHome && (
                            <Redirect to = "/" />
                        )
                    }
                  <UserProfile
                    isOpen={this.state.showProfile}
                    handleClose={() => {
                        this.setState({
                            showProfile: false
                        })
                    }
                    }
                    userObject = {this.state.userData}
                  />
                </div>
        )
    }
}
HomeBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        userStatus: state.userStatus
    }
}
export default connect(mapStateToProps)(withStyles(styles)(HomeBar))
