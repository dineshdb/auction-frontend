import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Toolbar from '@material-ui/core/Toolbar'
import {Rate,updateRate} from "../products";
import Grid from '@material-ui/core/Grid'
import {CustomButton} from "./buttons";
import Divider from '@material-ui/core/Divider'
import store, {subscribeAuctionAction,updateAuctionListAction,getHighestBid,newBid} from '../store'
import {Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {participateInAuction, getAuctionDetails, setBid, getBidDetails, fetchEach} from '../products'
import BootStrappedInput from '../components/textFields'
import moment from 'moment'
import TextField from '@material-ui/core/TextField'
import Favorite from '@material-ui/icons/FavoriteBorder'
import Button from '@material-ui/core/Button'
import {getRating} from "../products";
import {baseUrl} from "../config";
import {getFavorites} from "../products";
import {subscribeAuction} from "../socket";
import ToolTip from '@material-ui/core/Tooltip'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Animate from 'react-simple-animate'
import LinearProgress from '@material-ui/core/LinearProgress';
import Result from '../components/result'
import DropDown from '@material-ui/icons/ArrowDropDown'
import Rating from 'react-rating'
import Red from '../../src/assets/images/red.png'
import Grey from '../../src/assets/images/grey.png'
let styles = (theme)=>{
    return {
        paper: {

            marginTop: theme.spacing.unit*2

        },
        biddingForm: {
           margin: theme.spacing.unit,
            height: 350,
            opacity: 0.9,

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
            fontSize: 26,
            fontWeight: 300,
            color: "black",
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,

        },
        subTitle:{
            fontSize: 16,
            fontWeight: 200,
            color: "black",
            marginLeft: theme.spacing.unit*5,
            marginRight: theme.spacing.unit*5,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,

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
        baseMargin:{
            margin: theme.spacing.unit*2
        }
        ,
        textMargin: {
            marginLeft: theme.spacing.unit*5,
            marginTop: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginBottom: theme.spacing.unit*1
        },
        innerDiv: {
            marginRight: theme.spacing.unit*5
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
            buttonName: "Participate",
            timeDifference: null,
            eventDateTime: null,
            bidAmount: 0,
            totalTime: 0,
            eventStarted: false,
            eventEnded: false,
            seconds: 60,
            minutes: 10,
            highestBid: 0,
            bids: [],
            forHighestBid: [],
            forHighestBidder: [],
            bidReject: false,
            currentBidder: 0,
            currentBid: 0,
            currentHighest:0,
            timeSlice: 0,
            localHighest:0,
            openResult: false,
            rate: 0,
            ratings: [0,0,0,0,0],
            hasRated: false




        }
    }
    componentDidMount(){
        if(store.getState().isLoggedIn){
            getFavorites().then(res=>{
                if(res.length> 0){
                    res.map(favorite=>{
                        subscribeAuction(favorite)
                    })
                }

            }).catch(err=>console.log(err))

        }

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

                this.setState({
                    totalTime: duration,
                })
            }
            else{

                if (total_minutes < this.state.timeSlice){

                    this.setState({
                        minutes: this.state.timeSlice-minutes,
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
        // this.setState({
        //     highestBid: highest
        // })

    }

    render(){
        // {setInterval(this.handleDuration,1000)}
        const {classes, match} = this.props
        const id = this.props.match.params.id
        const userId = store.getState().user.userId
        let oneRating=0,twoRating=0,threeRating=0,fourRating=0,fiveRating=0
        let found = false
        if (this.state.count === 0) {
            axios({
                method: 'GET',
                url: `http://localhost:8080/items/${id}`,
                headers: {
                    'Authorization': store.getState().user.header
                },
            }).then((res) => {
                let details = res.data
                this.setState({
                    details: details,
                    count: 1
                })
                axios({
                    method: 'GET',
                    url: details.image,
                    headers: {
                        'Authorization': store.getState().user.header
                    },
                    responseType: 'blob'
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    this.setState({
                        image: url
                    })
                    let auction = details.auction
                    let participated = false
                    let buttonName = "Participate"
                    auction.bidders.map((bidder) => {
                        if (bidder == userId) {
                            participated = true,
                                buttonName = "Bid"
                        }
                    })

                    auction.bids.map((bid) => {
                        getBidDetails(bid.bidId)
                            .then((res) => {

                                this.setState({
                                    bids: [...this.state.bids, {
                                        auctionId: res.auction.auctionId,
                                        userId: res.bidder,
                                        bidAmount: res.bidAmount
                                    }],
                                    forHighestBidder: [...this.state.forHighestBidder, res.bidder],
                                    forHighestBid: [...this.state.forHighestBid, res.bidAmount]
                                })
                            })
                    })
                    let data = auction
                    this.setState({
                        auctionDetails: auction,
                        alreadyParticipated: participated,
                        buttonName: buttonName,
                        minutes: Number(data.auctionDuration) * 60,
                        timeSlice: Number(data.auctionDuration) / 60,
                        eventDateTime: moment(data.auctionDate + ' ' + data.auctionTime)
                    })
                    getRating(id)
                        .then(ratings => {
                            ratings.map((rating) => {
                                if(rating.userId === store.getState().user.userId){
                                    this.setState({
                                        hasRated: true,
                                        rate: rating.rating,
                                    })

                                }
                                if (rating.rating === 5) {
                                    fiveRating += 1
                                }
                                if (rating.rating === 1) {
                                    oneRating += 1
                                }
                                if (rating.rating === 2) {
                                    twoRating += 1
                                }
                                if (rating.rating === 3) {
                                    threeRating += 1
                                }
                                if (rating.rating === 4) {
                                    fourRating += 1
                                }
                            })


                            ratings =[oneRating,twoRating,threeRating,fourRating,fiveRating]
                            this.setState({
                                ratings: ratings
                            })

                        }).catch(err => console.log(err))


                })
            })


        }
        const {details,auctionDetails,bids,forHighestBid,forHighestBidder} = this.state

        let localHighest = this.state.details.startingBid
        let localHighestBidder = 0
        if(forHighestBid){
            localHighest = Math.max.apply(null,forHighestBid)
            localHighestBidder = Math.max.apply(null,forHighestBidder)
        }


        let highestBid = 0
        let highestBidder = ""
        store.getState().highestBid.map(bid=>{
            if(bid.auctionId === this.state.auctionDetails.auctionId){
                highestBid = bid.maximumBid
                highestBidder = bid.maximumBidder
            }
        })
    





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
                                <div className={classes.baseMargin}>
                                    <Typography
                                        align="left"
                                        className={classes.title}
                                        style={{fontSize: 20}}
                                    >{details.itemName}

                                    </Typography>

                                    <Typography
                                        className={classes.description}
                                        style={{fontSize: 14}}
                                    >{details.itemDescription}
                                    </Typography>
                                    <Typography
                                        className={classes.description}
                                        style={{fontSize: 17}}
                                    >STARTING BID
                                    </Typography>
                                    <Typography
                                        className={classes.description}
                                        style={{fontSize: 17}}
                                    >Rs. {details.startingBid}
                                    </Typography>
                                    <br/>
                                    {[5,4,3,2,1].map((x,key)=>{
                                        return <div>
                                           <Grid spacing={24}>
                                               <Grid item xs={6}>

                                                   <Rating
                                                       readonly
                                                       initialRating={x}
                                                       emptySymbol={<img  src={Grey} style={{width:20,height:20}} className="icon" />}
                                                       fullSymbol={<img  src={Red} style={{width:20,height:20}} className="icon" />}
                                                   />
                                               </Grid>
                                               <Grid item xs={6}>
                                                   <Typography style={{margin: 1}}>
                                                       {this.state.ratings[key]} people rated {x}
                                                   </Typography>
                                               </Grid>



                                            </Grid>

                                        </div>
                                    })}
                                </div>

                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    align="left"
                                    className={classes.title}
                                >{details.itemName}

                                </Typography>
                                <Typography className={classes.title} style={{marginTop: "20px"}}>
                                    Rs.{this.state.details.startingBid}
                                </Typography>
                                <Rating
                                    readonly={this.state.hasRated}
                                    initialRating={this.state.rate}
                                    onChange={(rate)=>{
                                        console.log("RATE",rate)
                                            Rate(this.props.match.params.id,rate).then(res=>{console.log(res)})
                                        this.setState({
                                            rate: rate,
                                            hasRated: true
                                        })
                                    }}
                                    emptySymbol={<img  src={Grey} style={{width:20,height:20}} className="icon" />}
                                    fullSymbol={<img  src={Red} style={{width:20,height:20}} className="icon" />}
                                />


                                <Grid container spacing={24}>
                                    <Grid item xs={7}>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {
                                            !this.state.eventEnded ? (!this.state.eventStarted ?  <Typography className={classes.description} style={{color: "#abacff"}}>
                                                starts in  {`${this.state.totalTime.days}d ${this.state.totalTime.hours}h ${this.state.totalTime.minutes}m ${this.state.totalTime.seconds}s  `}

                                            </Typography> : <div>


                                                <Typography className={classes.description} style={{color: 'green'}}>Ends in {this.state.minutes}m {this.state.seconds}s</Typography>
                                            </div>) : <Typography style={{fontSize: "15px",fontWeight: "lighter"}} align="left">Ended  On {this.state.auctionDetails.auctionDate}</Typography>
                                        }
                                        {

                                        }

                                    </Grid>
                                </Grid>


                                {this.state.eventEnded && (
                                    <div>
                                        {!this.state.openResult && <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={()=>{
                                                this.setState({
                                                    openResult: true
                                                })
                                            }}
                                        >Result <DropDown/>
                                        </Button>}

                                    </div>
                                )}
                                {
                                    this.state.eventEnded && (
                                        <Result
                                            isOpen={this.state.openResult}
                                            handleClose={()=>{
                                                this.setState({
                                                    openResult: false
                                                })
                                            }}
                                            highestBidder = {localHighestBidder}
                                            auctionObject = {this.state.auctionDetails}
                                            highestBid = {localHighest}
                                        />
                                    )
                                }
                                {this.state.eventStarted &&  <LinearProgress />}
                                <Divider className={classes.paper}/>
                                {
                                    this.state.eventEnded && (
                                        <div>

                                        </div>
                                    )
                                }
                                {!this.state.eventEnded && (
                                    <Paper square className={classes.biddingForm}>
                                        <div className={classes.innerDiv}>
                                            <br/>


                                            {this.state.alreadyParticipated ?  (<div>
                                                <Typography className={classes.subTitle} style={{marginTop: "20px"}}>
                                                    Highest Bid Rs.{highestBid > localHighest? highestBid: localHighest}
                                                </Typography>
                                                <TextField
                                                    className={classes.textMargin}
                                                    placeholder="Your Bid"
                                                    style={{width: "90%"}}
                                                    fullWidth
                                                    onChange={(e)=>{
                                                        this.setState({
                                                            bidAmount: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>): <Typography className={classes.subTitle} style={{marginTop: "20px"}}>
                                                Participate now to get the live update
                                            </Typography> }




                                            <CustomButton
                                                name={this.state.buttonName}
                                                color="primary"
                                                variant="contained"
                                                style={{
                                                    width: "90%",
                                                    borderRadius: 0,
                                                    marginTop: "20px"
                                                }}
                                                property={classes.textMargin}
                                                handler={()=>{

                                                    if((this.state.participated || this.state.alreadyParticipated) &&  ((this.state.bidAmount < details.startingBid) || (this.state.bidAmount <= highestBid))){
                                                        this.setState({
                                                            bidReject: true,
                                                        })
                                                    }
                                                    else{
                                                        let today = moment()
                                                        let auction = this.state.auctionDetails
                                                        let biddingObject = {
                                                            bidderId: store.getState().user.userId,
                                                            itemId: id,
                                                            auctionId: auction.auctionId,
                                                            bidAmount: this.state.bidAmount,
                                                            bidDate: `${today.format('YYYY-MM-DD')}`,
                                                            bidTime: `${today.format('HH:mm:ss')}`

                                                        }

                                                        if(!this.state.alreadyParticipated){
                                                            subscribeAuction(auction.auctionId)

                                                            participateInAuction(auction.auctionId)
                                                                .then(res => {
                                                                    let auction = {
                                                                        ...this.state.auctionDetails,
                                                                        id: this.state.auctionDetails.auctionId,
                                                                        state: 'READY',
                                                                        bids: this.state.bids
                                                                    }

                                                                    let found = false
                                                                    store.getState().auctions.map((auction) => {
                                                                        if (auction.auctionId === auction) {
                                                                            found = true
                                                                        }
                                                                    })
                                                                    if (!found) {
                                                                        store.dispatch(updateAuctionListAction(auction))
                                                                    }

                                                                    this.setState({
                                                                        participated: true,
                                                                        buttonName: "Bid",
                                                                        alreadyParticipated: true
                                                                    })

                                                                })
                                                        }
                                                        else{
                                                            axios({
                                                                method: 'POST',
                                                                url: `http://localhost:8080/bids/saveBid`,
                                                                headers: {
                                                                    'Authorization':store.getState().user.header
                                                                },
                                                                data: biddingObject
                                                            })

                                                        }



                                                    }


                                                }
                                                }


                                            />
                                            <Divider className={classes.subTitle}/>
                                            <Button

                                                color="secondary"
                                                variant="outlined"
                                                style={{
                                                    width: "90%",
                                                    borderRadius: 0
                                                }}
                                                className={classes.textMargin}
                                                onClick={()=>{
                                                    participateInAuction(this.state.auctionDetails.auctionId).then(res=>{console.log("Auction Added",res)})

                                                }}>
                                                <Favorite variant="outlined"/>
                                                Save this item

                                            </Button>


                                        </div>
                                    </Paper>

                                )
                                }


                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
                <SnackBar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.bidReject}
                    autoHideDuration={6000}
                    onClose={()=>{
                        this.setState({
                            bidReject: false
                        })
                    }}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Oops!!! You bid is less than the current bid </span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={()=>{
                                this.setState({
                                    bidReject: false
                                })
                            }}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

                {
                    (this.state.isOnline === undefined | !(this.state.isOnline)) && (
                        <Redirect to = "/login"/>
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