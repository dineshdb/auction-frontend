import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Close from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Location from '@material-ui/icons/LocationOn'
import Phone from '@material-ui/icons/Phone'
import Email from '@material-ui/icons/Email'
import User from '@material-ui/icons/VerifiedUser'
import {userProfile} from "../products";
import UserDetails from '../components/userProfile'
import Winner from '../../src/assets/images/winner.png'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import Win from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
const styles= (theme)=>{
    return {
        link: {
            fontSize: 30,
          '&hover':{
              textDecoration: 'underline',
              color: 'white'
          },
        },
        main: {
            margin: theme.spacing.unit
        },
        root:{
          marginLeft: theme.spacing.unit*30
        },
        margin: {
            margin: theme.spacing.unit
        },
        paper: {
            marginLeft: theme.spacing.unit*8,
            marginRight: theme.spacing.unit*8,
            marginTop: theme.spacing.unit,
            width: 500,
            height: 500
        },
        close:{
            marginLeft: theme.spacing.unit
        },
        avatar: {
            margin: theme.spacing.unit,
            marginLeft: theme.spacing.unit*80
        },
        bigAvatar: {
            width: 140,
            height: 140,
            color:'#fff',
            backgroundColor: '#4351aa'
        },
        purpleAvatar: {
            margin: 10,
            color: '#fff',
            backgroundColor: "#4351aa",
        },
        typo:{
            margin: theme.spacing.unit,
            color: '#11a6e5',
            fontWeight: 'lighter',
        }
    }
}
class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            userOpen: false,
            sellerOpen: false,
            userObject: {},
            sellerObject: {},
            count: 0,
            noOneParticipated: false
        }
    }

    componentDidMount() {
        this.setState({
            open: true
        })
    }

    render() {
        const {auctionObject, classes, handleClose, isOpen, highestBid, highestBidder} = this.props
        if (this.state.count === 0) {
            console.log(auctionObject, "auction")
            if (highestBid && auctionObject.bids.length > 0) {

                userProfile(highestBidder).then(res1 => {
                        this.setState({
                            userObject: res1,
                            count: 1
                        })
                    }
                )
                userProfile(auctionObject.seller).then(res1=>{
                    this.setState({
                        sellerObject: res1,
                        count:1
                    })
                })
            }
            else{
                this.setState({
                    noOneParticipated: true,
                    count: 1
                })
            }

        }

        return <div>
            {
                !this.state.noOneParticipated && (
                    <div>
                        <Collapse in={isOpen} onClose={handleClose}>
                            <Close
                                className={classes.close}
                                onClick={handleClose}
                            />
                        </Collapse>
                        <Collapse in={isOpen} onClose={handleClose} className={classes.root}>


                            <Grid container spacing={24}>
                                <Grid item xs={4} xl={4} sm={4} lg={4}>
                                    <img src={Winner} className={classes.bigAvatar}/>
                                    <Divider/>
                                    <Typography style={{color: "#cacb15", fontSize: "40", marginLeft: 20}}>
                                        Rs. {highestBid}
                                    </Typography>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={8} xl={8} sm={8} lg={8}>
                                </Grid>
                            </Grid>
                        </Collapse>
                        <Collapse in={isOpen} onClose={handleClose} className={classes.main}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{width: '100%'}}
                                onClick={() => {
                                    this.setState({
                                            userOpen: true
                                        }
                                    )
                                }
                                }
                            > Winner
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{width: '100%'}}
                                onClick={() => {
                                    this.setState({
                                            sellerOpen: true
                                        }
                                    )
                                }
                                }
                            > Seller
                            </Button>
                        </Collapse>
                        <UserDetails
                            isOpen={this.state.userOpen}
                            userObject={this.state.userObject}
                            handleClose={() => {
                                this.setState({
                                        userOpen: false
                                    }
                                )
                            }
                            }
                        />
                        <UserDetails
                            isOpen={this.state.sellerOpen}
                            userObject={this.state.sellerObject}
                            handleClose={() => {
                                this.setState({
                                        sellerOpen: false
                                    }
                                )
                            }
                            }
                        />
                    </div>

                )
            }
            {
                this.state.noOneParticipated && <div><Collapse in={isOpen} onClose={handleClose}>
                    <Typography> No any participation </Typography>
                </Collapse></div>
            }

        </div>
    }
}
Result.PropTypes = {
    userObject: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Result)