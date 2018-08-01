import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect } from 'react-router-dom'
import {getFavorites} from "../../products";
import {subscribeAuction} from "../../socket";
import {login} from '../../products'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      
    },
    button:{
        color: "white",
        '&:hover':{
            opacity: "0.7",
            color: "black"
        }
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
        marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
        color: "white"
    },
    });



class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
                userEmail: "",
                userPassword: "",
                userEmailLabel: "",
                userPasswordLabel: "",
                userEmailValid: true,
                userPasswordValid: true,
                submitValid: false,
                userId: "",
                userOnline: false,
                fireRedirect: false,
                loginFailed: false           
        }
    }
    componentWillUnmount(){
    }
    
        handleUserName(event){
            this.setState({
                userEmail: event.target.value
            })
           
        }
        handleUserPassword(event){
            this.setState({
                userPassword: event.target.value
            })           
        }

        validateUserName(){
            const {userEmail} = this.state
            if(userEmail.length > 0){
                this.setState({
                    userEmailValid: true,
                    userEmailLabel: "Username"
                })
            }
            else{
                this.setState({
                    userEmailValid: false,
                    userEmailLabel: "Invalid"
                })
            }
        }
        validateUserPassword(){
            const {userPassword} = this.state
            if(userPassword.length > 0){
                this.setState({
                    userPasswordValid: true,
                    userPasswordLabel: "Password"
                })
            }
            else{
                this.setState({
                    userPasswordValid: false,
                    userPasswordLabel: "Invalid"
                })
            }
        }
       
        validateSubmit(){
            const {userEmailValid,userPasswordValid} = this.state
           this.setState({
               submitValid: (userEmailValid && userPasswordValid)
           })
            
             
        }

        handleSubmit(event){           
            event.preventDefault()
            const postingData = {
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword
            }
            login(postingData)
                .then(payload => {
                    this.props.dispatch({type: 'SIGN_IN', payload })
                    this.setState({
                        fireRedirect: true
                    })
                    return getFavorites()
                }).then(res =>{
                    res.map(favorite=>{
                        subscribeAuction(favorite)
                    })
                })

            .catch(err => {
                console.log("Error")
                this.setState({
                    userOnline: false
                })
                throw err
            })
        }
        handleRedirect= () =>{
            this.setState({
                fireRedirect: true
            })
        }

        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40, marginBottom: 40, marginRight: 20, marginLeft: 20}}>
                    <form onSubmit={this.handleSubmit.bind(this)} >
                    <div>
                        <Grid container spacing={24}>
                            <Grid item xs="4">
                            </Grid>
                            <Grid item xs="4">
                                <div>
                                <TextField
                                    style={{color: "white"}}
                                    name="Email"
                                    margin="dense"
                                    id="Email"
                                    type="text"
                                    error={!this.state.userEmailValid}
                                    placeholder="Email"
                                    onChange={this.handleUserName.bind(this)}
                                    onBlur = {this.validateUserName.bind(this)}

                                    fullWidth
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            root: classes.bootstrapRoot,
                                            input: classes.bootstrapInput,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        className: classes.bootstrapFormLabel,
                                    }}
                                />
                                </div>

                        <div>
                            <TextField
                                error={!this.state.userPasswordValid}
                                margin="dense"
                                id="Password"
                                type="password"
                                placeholder="Password"
                                onChange={this.handleUserPassword.bind(this)}
                                onBlur = {this.validateUserPassword.bind(this)}
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                    classes: {
                                        root: classes.bootstrapRoot,
                                        input: classes.bootstrapInput,
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.bootstrapFormLabel,
                                }}

                            />
                            <div style={{float: "right", margin: "5px"}}>
                            <Button
                                variant = "contained"
                                type="submit"
                                color="primary"
                                className={classes.button}
                            ><Typography style={{fontWeight: "lighter"}}>
                                Login
                            </Typography>
                            </Button>
                            </div>
                        </div>
                            </Grid>


                            </Grid>

                    </div>
                    </form> 
                   

                
                {this.state.fireRedirect && (
                    <Redirect to = "/" />
                )}
                {this.state.loginFailed && (
                    <Redirect to = "/error" />
                )}
                </div>

            )
        }
    
}
LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  function mapStateToProps(state){
    return {
        newUsers: state.newUsers
    }
}
export default connect(mapStateToProps)(withStyles(styles)(LoginForm));
