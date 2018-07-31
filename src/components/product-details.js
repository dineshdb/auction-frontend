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
import store, {subscribeAuctionAction,updateAuctionListAction} from '../store'
import {Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {participateInAuction,getAuctionDetails,setBid} from '../products'
import BootStrappedInput from '../components/textFields'
import moment from 'moment'
import TextField from '@material-ui/core/TextField'
import Favorite from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
import {baseUrl} from "../config";


let styles = (theme)=>{
    return {
        paper: {
            marginLeft: theme.spacing.unit * 15,
            marginRight: theme.spacing.unit * 15,
            marginTop: theme.spacing.unit*2

        },
        biddingForm: {
           margin: theme.spacing.unit,
           height: 300,
           opacity: "0.7"
        
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
          fontSize: 20,
          fontWeight: 300,
          color: "black",
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,

        },
        subTitle:{
            fontSize: 20,
            fontWeight: 300,
            color: "black",
              marginLeft: theme.spacing.unit*5,
              marginRight: theme.spacing.unit,
              marginTop: theme.spacing.unit*3,
              marginBottom: theme.spacing.unit*2,
  
          },
        top: {
            fontSize: 20,
            fontWeight: 200,
            color: "#050505",
            marginTop: theme.spacing.unit
        },
        description: {
            fontSize: 14,
            fontWeight: 200,
            color: "#050505",
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
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

        },
        textMargin: {
            marginLeft: theme.spacing.unit*5,
            marginTop: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginBottom: theme.spacing.unit*1
        },
       
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
            isOnline : store.getState().user.isLoggedIn,
            openDialog: false,
            participated: false,
            alreadyParticipated: false,
            buttonName: "Participate",
            timeDifference: null,
            eventDateTime: null,
            bidAmount: 0,
            totalTime: 0,
            eventStarted: false,
            eventEnded: false,
            seconds: 60,
            minutes: 10



        }
    }
    componentDidMount(){

       this.tick()

    }
    tick(){
        setInterval(this.handleDuration,1000)

    }
    handleDuration = ()=>{
        if(this.state.eventStarted){
            if(this.state.minutes >= 1){
                if(this.state.seconds <= 0){
                    this.setState({
                        minutes: this.state.minutes-1,
                        seconds: 60
                    })
                }
                else{
                    this.setState({
                        seconds: this.state.seconds-1
                    })
                }
            }

            else{
                this.setState({
                    eventEnded: true
                })
            }
        }
        else{
            let duration_ = moment.duration(this.state.eventDateTime-moment())
            let duration=duration_._data

            let total_minutes = Number(Math.abs(Number(duration.hours))*60+Math.abs(Number(duration.minutes))+Math.abs(Number(duration.seconds/60)))
            let minutes = Math.floor(total_minutes)
            let seconds = Math.floor((total_minutes-minutes)*60)


            if(duration_ > 0){
                duration = duration._data
                this.setState({
                    totalTime: duration,
                })
            }
            else{

                if (total_minutes < 11){
                    console.log("duration",duration)
                    console.log("minutes",minutes,"seonds",seconds)
                    this.setState({
                        minutes: 11-minutes,
                        seconds: 60-seconds
                    })
                    this.setState({
                        eventStarted: true
                    })
                }
                else{
                    this.setState({
                        eventEnded: true
                    })
                }

            }
        }

    }

    render(){
        // {setInterval(this.handleDuration,1000)}
        const {classes, match} = this.props
        const id = this.props.match.params.id
        const userId = store.getState().user.id
        if (this.state.count === 0){
            axios({
                method: 'GET',
                url: `http://localhost:8080/items/${id}`,
                headers: {
                    'Authorization':store.getState().user.header
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
                        'Authorization':store.getState().user.header
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
                            'Authorization':store.getState().user.header
                        },
                    }).then(res=>{
                        console.log("auctionDetails",res)
                        console.log("in store",store.getState())
                        let participated = false
                        let buttonName = "Participate"
                        res.data.bidders.map((bidder)=>{
                            if(bidder == userId){
                                participated=true,
                                    buttonName="Participated"
                            }
                        })
                        let data = res.data

                       console.log(moment(data.auctionDate+' '+data.auctionTime),"eventDateTime")
                        this.setState({
                            auctionDetails: res.data,
                            alreadyParticipated: participated,
                            buttonName: buttonName,
                            eventDateTime: moment(data.auctionDate+' '+data.auctionTime)
                        })
                    })

                })
            })
        }
        const {details,auctionDetails} = this.state
        return (
            <div className={classes.root}>
            <div style={{display: 'none'}}>
            
             </div>
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
                            <Grid item xs={6}>
                                <CardMedia
                                    className={classes.media}
                                    image={this.state.image}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                    <Typography
                                            align="left"
                                            className={classes.title}
                                        >{details.itemName}
                                    
                                        </Typography>

                                    <Typography
                                        className={classes.description}
                                    >{details.itemDescription}
                                    </Typography>
                                    <Grid container spacing={24}>
                                    <Grid item xs={7}>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {
                                            !this.state.eventEnded ? (!this.state.eventStarted ?  <Typography className={classes.description} style={{color: "red"}}>
                                                starts in  {`${this.state.totalTime.days}d ${this.state.totalTime.hours}h ${this.state.totalTime.minutes}m ${this.state.totalTime.seconds}s  `}

                                            </Typography> : <Typography className={classes.description} style={{color: 'green'}}>Ends in {this.state.minutes}m {this.state.seconds}s</Typography>) : <Typography>Ended</Typography>
                                        }
                                        {

                                        }

                                    </Grid>
                                    </Grid>
                                   
                                <Divider/>
                               
                                {!this.state.eventEnded && (
                                    <Paper square className={classes.biddingForm}>
                                        <br/>
                                        <Typography className={classes.subTitle} style={{marginTop: "20px"}}>
                                            Rs.{this.state.details.startingBid}
                                        </Typography>
                                        <TextField
                                            className={classes.textMargin}
                                            placeholder="Your Bid"
                                            style={{width: "80%"}}
                                            fullWidth
                                            onChange={(e)=>{
                                                this.setState({
                                                    bidAmount: e.target.value
                                                })
                                            }}
                                        />
                                        <CustomButton
                                            name="Place Bid"
                                            color="primary"
                                            variant="contained"
                                            style={{
                                                width: "80%",
                                                borderRadius: 0,
                                                marginTop: "20px"
                                            }}
                                            property={classes.textMargin}
                                            handler={()=>{
                                                let today = moment()
                                                let auction = this.state.auctionDetails
                                                let biddingObject = {
                                                    bidderId: store.getState().user.id,
                                                    itemId: id,
                                                    auctionId: auction.auctionId,
                                                    bidAmount: this.state.bidAmount,
                                                    bidDate: `${today.format('YYYY-MM-DD')}`,
                                                    bidTime: `${today.format('HH:mm:ss')}`

                                                }
                                                console.log("BIDDING DATA",biddingObject)

                                                axios({
                                                    method: 'POST',
                                                    url: `http://localhost:8080/bids/saveBid`,
                                                    headers: {
                                                        'Authorization':store.getState().user.header
                                                    },
                                                    data: biddingObject
                                                }).then(res=>{
                                                    console.log("ReSPONSE",res)
                                                    participateInAuction(auction.auctionId)
                                                        .then(res =>{

                                                            store.dispatch(subscribeAuctionAction(this.state.auctionDetails.auctionId))
                                                            let auction = {...this.state.auctionDetails,id:this.state.auctionDetails.auctionId,state:'READY'}

                                                            console.log("auction details",this.state.auctionDetails)
                                                            store.dispatch(updateAuctionListAction(auction))
                                                            console.log(store.getState())
                                                            this.setState({
                                                                participated: true
                                                            })
                                                        })
                                                })



                                            }}

                                        />
                                        <Divider style={{marginTop: "5px",marginBottom: "5px",marginLeft: "35px",marginRight: "50px"}}/>
                                        <Button

                                            color="primary"
                                            variant="outlined"
                                            style={{
                                                width: "80%",
                                                borderRadius: 0
                                            }}
                                            className={classes.textMargin}
                                            onClick={()=>{

                                            }}>
                                            <Favorite variant="outlined"/>
                                            Save this item

                                        </Button>

                                    </Paper>
                                )
                                }

                        
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