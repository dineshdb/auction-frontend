import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Notifications from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'





const styles = {

    root: {
        flexGrow: 1,
        backgroundColor: "#66adce",
       
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
        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        //TODO userToken
        // if(userToken){
        //     this.setState({
        //         isOnline: userToken.isOnline,
        //         userId: userToken.id,
        //         userName: userToken.userName
        //     })
        // }
        /*
            Remove the following code after the api has been made
         */
        this.setState({
                    isOnline: true,
                    userId: 12,
                    userName: "Rupesh"
                })

        
    }
    handleLogOut(){
        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        if(userToken){
           localStorage.removeItem(USER_TOKEN)
           this.setState({
               isOnline: false,
               userId: ""
           })
        }
        this.fireHome()
        
    }
    fireHome(){
        this.setState({
            fireHome: true
        })
    }


    render() {
        
        console.log("new state",this.state)
        const {classes} = this.props;
        if(!this.state.isOnline){
            return (
                <div >
                    {
                    (this.state.fireHome) && (<Redirect to = "/" />)
                     }
                    <AppBar position="static" className={classes.root}>
                        <Toolbar>
                            <Grid container spacing = {24}>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={1}>
                                <Link to="/" className={classes.pad}>
                                    <Button color="inherit">
                                    Home
                                    </Button>
                                </Link>
                                </Grid>
                                <Grid item xs={8}>
                                </Grid>
                                <Grid item xs={1}>
                                <Link to="/signup" className={classes.pad}>
                                    <Button 
                                    color="inherit"
                                    variant="contained"
                                    >
                                    Register
                                    </Button>
                                </Link>
                                </Grid>
                                <Grid item xs={1}>
                                <Link to="/login" className={classes.pad}>
                                    <Button color="inherit">
                                    Login
                                    </Button>
                                </Link>
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
                    <AppBar position="static" className={classes.root}>

                            <Grid container spacing = {24} >
                                <Grid item xs={6}>

                                    <Button color="inherit">
                                    Hi {this.state.userName}
                                    </Button>
                                    |
                                    <Button color="inherit">
                                        Daily Deals
                                    </Button>
                                    |
                                    <Button color="inherit">
                                        Sell
                                    </Button>
                                    |
                                    <Button color="inherit">
                                        Help & Support
                                    </Button>

                                </Grid>
                                <Grid item xs={4}>
                                </Grid>
                                <Grid>
                                    <IconButton>
                                        <Notifications/>

                                    </IconButton>
                                    <IconButton>
                                        <ShoppingCart/>
                                    </IconButton>
                                </Grid>
                                    item xs={2}
                                </Grid>
                               

                    </AppBar>
                    
             

                </div>
            );

        }
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
