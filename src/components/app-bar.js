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

    typoButton: {
        fontSize: "15px",
        fontWeight: "lighter",
        color: "#ffffff"
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
});

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

    gotoHelp(){
        this.handleClose()
    }
    openProfile(){
        this.handleClose()
    }
    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state
        const open = Boolean(anchorEl);
        let isOnline = false
        let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        if(userToken){
           isOnline = true
            }
        return (
                <div >
                    <AppBar position="static" className={classes.root}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <Icon>menu</Icon>
                            </IconButton>
                            
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                <Link to="/">
                                BidSteller.com
                                </Link>
                                </Typography>
                            
                            {isOnline && (
                                <div>
                                    <Link to="/add">
                                        <Icon>add</Icon>
                                    </Link>
                                    <Link to="/notifications">
                                        <Badge className={classes.margin} badgeContent={4} color="primary">
                                            <Icon>notifications</Icon>
                                        </Badge>
                                    </Link>
                                    <Link to="/cart">
                                        <Badge className={classes.margin} badgeContent={4} color="primary">
                                            <Icon>shopping_cart</Icon>
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
                            {   !isOnline && (
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
