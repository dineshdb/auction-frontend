import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import {Redirect} from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import {signup} from '../../products'
const styles = theme => ({
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
    },
});


class SignUpForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
                userName: "",
                email: "",
                password: "",
                phone: "",
                address:"",
                userNameValid: true,
                emailValid: true,
                passwordValid: true,
                phoneValid: true,
                addressValid: true,
                userNameLabel: "Username",
                emailLabel: "Email",
                passwordLabel: "Password",
                phoneLabel: "Phone",
                addressLabel: "Address",
                submitValid: false,
                triggerSubmit: false            
        }
    }
    
    validateSubmit(){
        const {userNameValid,emailValid,passwordValid,phoneValid,addressValid} = this.state
        return !(userNameValid && emailValid && passwordValid && phoneValid && addressValid)    
    }
    handleUserName(event){      
        this.setState({
            userName: event.target.value
        })
        this.validateUserName()   
    }

    handleEmail(event){
        this.setState({
            email: event.target.value
        })
        this.validateEmail()   
    }
    handlePassword(event){
        this.setState({
            password: event.target.value
        })
        this.validatePassword()   
    }
    handlePhone(event){
        this.setState({
            phone: event.target.value
        })
        this.validatePhone()    
    }
    handleAddress(event){
        this.setState({
            address: event.target.value
        })
        this.validateAddress()    
    }
    validateUserName(){
        const {userName} = this.state
        if(userName.length > 0){
            this.setState({
                userNameValid: true,
                userNameLabel: "Username"
            })
        } else{
            this.setState({
                userNameValid: false,
                userNameLabel: "Invalid"
            })
        }
    }

        validateEmail(){
            const {email} = this.state
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(email).toLowerCase())){
                this.setState({
                    emailValid: false,
                    emailLabel: "Invalid Email"
                })
            }
            else{
                this.setState({
                    emailValid: true,
                    emailLabel: "Email"
                })
            }
        }
            
        validatePassword(){
            const {password} = this.state
            if(password.length > 7){
                this.setState({
                    passwordValid: true,
                    passwordLabel: "Password"
                })
            }
           
            else{
                this.setState({
                    passwordValid: false,
                    passwordLabel: "Invalid Password"
                })
            }
        }
        validatePhone(){
            const {phone} = this.state
            if(phone.length === 10 ){
                this.setState({
                    phoneValid: true,
                    phoneLabel: "Phone"
                    
                })
            }
            else{
                this.setState({
                    phoneValid: false,
                    phoneLabel: "Invalid Phone No"
                })
            }
        }
        validateAddress(){
            const {address} = this.state
            if(address.length > 0){
                this.setState({
                    addressValid: true,
                    addressLabel: "Address"
                    
                })
            }
            else{
                this.setState({
                    addressValid: false,
                    addressLabel: "Invalid Address"
                })
            }
        }
       
        handleSubmit(event){
            event.preventDefault()
            const {userName,name,password,email,phone,address} = this.state
            const signUpObject = {
                userName: userName,
                userPassword: password,
                userEmail: email,
                userPhone: phone,
                userAddress: address
            }
            // signup(signUpObject).then(res =>{
            //     this.setState({
            //         triggerSubmit: true
            //     })
            // })
            axios.post('http://localhost:8080/users/sign-up'
            ,(signUpObject),{crossDomain: true})
            .then(response => {
                this.setState({
                    triggerSubmit: true
                })    
            })
        }

        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40}}>
                    <Grid container spacing = {24}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>

                    <br/>
                    <Typography 
                        align="center"
                        style={{
                            fontWeight: "lighter",
                            fontSize: "30px"
                        }}
                    >
                    Welcome To BidStellar
                    </Typography>
                   
                    <Typography 
                        align="center"
                        style={{
                            fontWeight: "lighter",
                            fontSize: "15px"
                        }}
                    >
                    This will only take less than a minute !!!
                    </Typography>
                        <Paper>
                        <form onSubmit={this.handleSubmit.bind(this)} style={{margin: "20px"}}>
                        <div>
                        <TextField
                                margin="dense"
                                type="text"
                                error={!this.state.userEmailValid}
                                placeholder="Username"
                                label= {this.state.userEmailLabel}
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
                                error={!this.state.emailValid}
                                margin="dense"
                                id="email"
                                type="email"
                                placeholder="Email"
                                label={this.state.emailLabel}
                                onChange={this.handleEmail.bind(this)}
                                onBlur ={this.validateEmail.bind(this)}
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
                                fullWidth
                            />
                             </div>
                            <div>
                        <TextField
                            error={!this.state.passwordValid}
                               name="password"
                               margin="dense"
                               id="password"
                               type="password"
                               placeholder="Password"
                               label= {this.state.passwordLabel}
                               onChange={this.handlePassword.bind(this)}
                               onBlur = {this.validatePassword.bind(this)}
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
                               fullWidth
                            />
                             </div>
                            <div>
                         <TextField
                                error={!this.state.phoneValid}
                                name="phone"
                                margin="dense"
                                id="phone"
                                type="text"
                                placeholder="Phone"
                                label={this.state.phoneLabel}
                                onChange={this.handlePhone.bind(this)}
                                onBlur= {this.validatePhone.bind(this)}
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
                                fullWidth
                            />
                             </div>
                            <div>
                             <TextField
                                error={!this.state.addressValid}
                                margin="dense"
                                name="address"
                                id="address"
                                type="text"
                                placeholder="Address"
                                label={this.state.addressLabel}
                                onChange={this.handleAddress.bind(this)}
                                onBlur={this.validateAddress.bind(this)}
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
                        <Grid container spacing={24} style={{marginTop: 10}}>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs = {8}>
                                <Toolbar>
                                    <Link to = "/">
                                        <Button
                                            color="secondary"
                                            style={{margin: "5px"}}
                                        > Cancel </Button>
                                    </Link>
                                    <Button
                                    variant = "contained"
                                    type="submit"
                                    color="primary"
                                    style={{margin: "5px"}}
                                    >  Submit </Button>
                                </Toolbar>
                            </Grid>
                        </Grid>
                        </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    </Grid>  
                    {
                        this.state.triggerSubmit && <Redirect to = "/login" />
                    }
                </div>
            )
        }   
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignUpForm);