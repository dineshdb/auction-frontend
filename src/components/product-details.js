import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid'
import {CustomButton} from "./buttons";
import Divider from '@material-ui/core/Divider'
import {USER_TOKEN} from "../definitions/index";
import store from '../store'
import {Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Right from '@material-ui/icons/Check'
import {addToCart} from "../store";


let styles = (theme)=>{
    return {
        paper: {
            marginLeft: theme.spacing.unit * 15,
            marginRight: theme.spacing.unit * 15,
            marginTop: theme.spacing.unit*2

        },
        card: {
            height: "60%",
            maxWidth: "100%",
            width: "100%",
            margin: theme.spacing.unit,

        },
        media: {
            marginLeft: theme.spacing.unit*3,
            marginTop: theme.spacing.unit*3,
            marginBottom: theme.spacing.unit*3,
            height: 0,
            paddingTop: '56.25%'
        },
        title:{
          fontSize: 40,
          fontWeight: 300,
          color: "#6b6b6b",
            margin: theme.spacing.unit
        },
        top: {
            fontSize: 25,
            fontWeight: 200,
            color: "#050505",
            marginTop: theme.spacing.unit
        },
        description: {
            fontSize: 15,
            fontWeight: 200,
            color: "#050505",
            marginTop: theme.spacing.unit
        },
        actions: {
            display: 'flex',
        },
        expand: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
            marginLeft: 'auto',
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        link: {
            color: "black",
            opacity: "0.8",
            '&:hover': {
                textDecoration: "underline"
            }

        },
        margin: {
            marginLeft: theme.spacing.unit*30,
            marginRight: theme.spacing.unit*30,
            marginTop: theme.spacing.unit*2,

        }
    }
}

class ProductDetails extends React.Component {
    constructor(props){
        super(props)
        this.state={
            details : {},
            count : 0,
            image: null,
            auctionDetails:{},
            isOnline : store.getState().isLoggedIn,
            openDialog: false,
            participated: false,
            alreadyParticipated: false,
            buttonName: ""
        }
    }
    render(){
        const {classes, match} = this.props
        const id = this.props.match.params.id
        const userId = store.getState().id
        if (this.state.count === 0){
            axios({
                method: 'GET',
                url: `http://localhost:8080/items/${id}`,
                headers: {
                    'Authorization':store.getState().header
                },
            }).then((res)=>{
                this.setState({
                    details: res.data,
                    count: 1
                })
                axios({
                    method: 'GET',
                    url: this.state.details.image,
                    headers: {
                        'Authorization':store.getState().header
                    },
                    responseType: 'blob'
                }).then((response)=>{
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    this.setState({
                        image: url
                    })
                    axios({
                        method: 'GET',
                        url: `http://localhost:8080/auctions/${this.state.details.auction}`,
                        headers: {
                            'Authorization':store.getState().header
                        },
                    }).then(res=>{
                        let participated = false
                        let buttonName = "Participate"
                        res.data.bidders.map((bidder)=>{
                            if(bidder == userId){
                                participated=true,
                                    buttonName="Participated"
                            }
                        })
                        this.setState({
                            auctionDetails: res.data,
                            alreadyParticipated: participated,
                            buttonName: buttonName
                        })
                    })

                })
            })
        }
        const {details,auctionDetails} = this.state
        return (
            <div className={classes.root}>
                <Typography
                    align="center"
                    className={classes.title}
                >Product Details</Typography>
                <Paper
                    square
                    elevation={0}
                    className={classes.paper}
                >

                    <Card
                        elevation={0}
                        square
                        className={classes.card}>
                        <Grid container spacing={24} >
                            <Grid item xs={8}>
                                <Typography
                                    align="center"
                                    className={classes.title}
                                >{details.itemName}
                                    <Divider/>
                                </Typography>
                                <CardMedia
                                    className={classes.media}
                                    image={this.state.image}
                                />
                            </Grid>
                            <Grid item xs={4}>


                                <Typography
                                    className={classes.top}

                                >Description
                                </Typography>
                                <Divider/>
                                    <Typography
                                        className={classes.description}
                                    >{details.itemDescription}
                                    </Typography>
                                    <Divider/>
                                <Grid container spacing={24}>
                                    <Grid item xs={4}>
                                        <Typography
                                            className={classes.top}

                                        >Date
                                        </Typography>
                                        <Typography
                                            className={classes.description}
                                        >{auctionDetails.auctionDate}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography
                                            className={classes.top}

                                        >Time
                                        </Typography>
                                        <Typography
                                            className={classes.description}
                                        >{auctionDetails.auctionTime}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography
                                            className={classes.top}

                                        >Duration
                                        </Typography>
                                        <Typography
                                            className={classes.description}
                                        >{auctionDetails.auctionDuration}
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Divider/>
                                <Typography
                                    className={classes.top}

                                >Minimum Bid
                                </Typography>
                                <Typography
                                    className={classes.description}
                                >Rs. {details.startingBid}
                                </Typography>

                                   <CardActions>
                                       <CustomButton
                                           disabled={this.state.alreadyParticipated}
                                           name={this.state.buttonName}
                                           color="primary"
                                           variant="contained"
                                           style={{
                                               width: "100%",
                                               borderRadius: 0
                                           }}
                                           handler={()=>{
                                                this.setState({
                                                    openDialog: true
                                                })

                                           }}/>
                                       <Dialog
                                           open={this.state.openDialog}
                                           onClose={()=>{
                                               this.setState({
                                                   openDialog: false
                                               })
                                           }}
                                           aria-labelledby="alert-dialog-title"
                                           aria-describedby="alert-dialog-description"
                                       >
                                           <DialogTitle
                                               id="alert-dialog-title"
                                           >Do you want to participate?</DialogTitle>
                                           <DialogActions>
                                             <CustomButton
                                                 name="Yes"
                                                 handler={()=>{
                                                     this.setState({
                                                         openDialog: false
                                                     })
                                                     let auction = this.state.auctionDetails
                                                     let url = `http://localhost:8080/auctions/${auction.auctionId}/participate/${store.getState().id}`
                                                         axios({
                                                             method: 'GET',
                                                             url: url,
                                                             headers: {
                                                                 'Authorization': store.getState().header
                                                             }
                                                         }).then((response)=>{
                                                            console.log("RESPONSE FROM CREATE_AUCTION",response)
                                                             this.setState({
                                                                 participated: true
                                                             })
                                                         })
                                                 }}
                                                 color="primary"
                                                 variant="contained"
                                             />
                                               <CustomButton
                                                   name="No"
                                                   handler={()=>{
                                                       this.setState({
                                                           openDialog: false
                                                       })
                                                   }}
                                                   color="secondary"
                                                   variant="outlined"
                                               />
                                           </DialogActions>
                                       </Dialog>
                                   </CardActions>




                            </Grid>
                        </Grid>






                    </Card>
                </Paper>
                {
                    (this.state.isOnline === undefined | !(this.state.isOnline)) && (
                        <Redirect to = "/login"/>
                    )
                }
                {
                    (this.state.participated && (
                        <Redirect to = "/" />
                        )
                    )
                }
            </div>
        )
    }
}

ProductDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state){
    return {

    }
}

export default (withStyles(styles)(ProductDetails));