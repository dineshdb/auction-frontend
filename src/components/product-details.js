import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {USER_TOKEN} from "../definitions/index";
import Grid from '@material-ui/core/Grid'
import {CustomButton} from "./buttons";

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
        description: {
            fontSize: 25,
            fontWeight: 200,
            color: "#050505",
            marginTop: theme.spacing.unit*10
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
            auctionDetails:{}
        }
    }
    componentWillReceiveProps(props){
        console.log("HEy",props)
    }
    render(){
        const {classes, match} = this.props
        const id = this.props.match.params.id
        if (this.state.count === 0){
            axios({
                method: 'GET',
                url: `http://localhost:8080/items/${id}`,
                headers: {
                    'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
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
                        'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
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
                            'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
                        },
                    }).then(res=>{
                        console.log("hey data",res)
                        this.setState({
                            auctionDetails: res.data
                        })
                    })

                })
            })
        }
        const {details,auctionDetails} = this.state
        return (
            <div className={classes.root}>
                <Typography
                    style={{
                        fontSize: "30px",
                        color: "black",
                        fontWeight: "lighter"
                    }}
                    align="center"
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
                        <Grid container spacing={24}>
                            <Grid item xs={8}>
                                <Typography
                                    align="center"
                                    className={classes.title}
                                >{details.itemName}
                                </Typography>
                                <CardMedia
                                    className={classes.media}
                                    image={this.state.image}
                                />
                            </Grid>
                            <Grid item xs={4}>



                                    <Typography
                                        className={classes.description}
                                    >{details.itemDescription}
                                    </Typography>
                                <Typography
                                    className={classes.description}
                                >{details.itemDescription}
                                </Typography>

                                   <CardActions>
                                       <CustomButton
                                           name="Participate"
                                           color="primary"
                                           variant="outlined"
                                           style={{
                                               width: "50%"
                                           }}
                                           handler={()=>{

                                           }}/>
                                   </CardActions>




                            </Grid>
                        </Grid>






                    </Card>
                </Paper>
            </div>
        )
    }
}

ProductDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetails);