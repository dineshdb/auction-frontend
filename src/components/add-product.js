import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import ToolBar from '@material-ui/core/Toolbar'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Add from '@material-ui/icons/Add'
import {CustomButton} from "./buttons";
import {SimpleTextField} from "./textFields";
import BootStrappedTextField from './textFields'
import SelectItem from "./dialogs";
import {USER_TOKEN} from "../definitions/index";

const styles = theme => ({
    root: {
      marginLeft: "40px",
      marginRight: "40px",
      marginTop: "20px",
    },
    paper: {
      marginLeft: "20px",
        marginTop: "40px"
    },
    button: {
        margin: theme.spacing.unit*3,

    },
    card: {

        marginTop: "8%",
        height: "100%"
    },
    media: {

        paddingTop: '56.25%',
        height: "52.57%"// 16:9
    },
    date:{
        fontSize: "20px",
        fontWeight: "lighter",
        marginTop: "5px",
        marginBottom: "30px",
    },
    margin: {
        margin: theme.spacing.unit,

    },
    leftName: {
        marginTop: "10px",
        marginBottom: "30px",
        fontSize: "25px",
        fontWeight: "lighter"
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
    },
    cardTitle: {
        fontSize: "30px",
        fontWeight: "lighter"
    },
    cardP: {
        fontSize: "15px",
        fontWeight: "lighter"
    },
    typo:{
      width: "300%"
    },
    initialTypo:{
        width: "100%"
    },

});

class SellProductForm extends React.Component {


    constructor(props){
        super(props)
        this.state={
            selectedImage: null,
            imageUrl: null,
            category: "",
            title: "",
            description: "",
            eventDate: moment(),
            eventTime: "",
            eventDuration: "",
            categories: {},
            openItemMenu: false,
            itemName: "",
            itemDescription: "",
            startingBid: "",
            itemCategory: ""

        }
        this.fileInput = React.createRef()
    }
    componentDidMount() {
        let categories = []
        axios({
            method: 'GET',
            url: `http://localhost:8080/categories`,
            headers: {
                'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
            }
        }).then((response)=> {

            response.data.map((category) => {
                categories.push(category)
            })
            this.setState({
                categories: categories
            })
        })
    }
    handleAddItem = (event) => {
        this.setState({
            openItemMenu: true
        })
    }

    handleSelectionOfImage = (event) => {
        this.setState({
            selectedImage: event.target.files[0],
            imageUrl: URL.createObjectURL(event.target.files[0])
        })
    }

    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Typography

                    style={{
                        fontSize: "30px",
                        color: "black",
                        fontWeight: "lighter"
                    }}
                    align="center"
                >
                    Auction Details

                </Typography>

                    <Grid container spacing="24">
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={24} className={classes.margin}>
                                    
                                    <Grid item xs={9}>
                                        <ToolBar >
                                            <Grid container spacing="24">
                                                <Grid item xs="3" >
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Title*
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs="9">
                                                    <BootStrappedTextField
                                                        margin="dense"
                                                        type="text"
                                                        placeholder="Name"
                                                        property={classes.initialTypo}
                                                        handler={(event) => {
                                                            this.setState({
                                                                title: event.target.value
                                                            })
                                                        }}

                                                    />
                                                </Grid>
                                            </Grid>
                                        </ToolBar>


                                        <ToolBar  >
                                            <Grid container spacing="24">
                                                <Grid item xs="3">
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Description*
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs="9">
                                                    <BootStrappedTextField
                                                        margin="dense"
                                                        type="text"
                                                        placeholder="Description"
                                                        textArea="true"
                                                        property={classes.initialTypo}
                                                        handler={(event) => {
                                                            this.setState({
                                                                description: event.target.value
                                                            })
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </ToolBar>
                                        <ToolBar >
                                            <Grid container spacing="24">
                                                <Grid item xs="5">
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Date*
                                                    </Typography>
                                                    <DatePicker
                                                        selected={this.state.eventDate}
                                                        onChange={(date)=>{
                                                            this.setState({
                                                                eventDate: date
                                                            })
                                                        }}
                                                        className={classes.date}
                                                    />
                                                </Grid>
                                                <Grid item xs="1">
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Starting*
                                                    </Typography>
                                                    <SimpleTextField
                                                        id="time"
                                                        label="Event Start"
                                                        type="time"
                                                        defaultValue="12:00"
                                                        handler={(event)=>{
                                                            this.setState({
                                                                eventTime: event.target.value
                                                            })
                                                        }}
                                                        property={classes.typo}
                                                    />
                                                </Grid>
                                                <Grid item xs="2">
                                                </Grid>
                                                <Grid item xs="1">
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Duration*
                                                    </Typography>
                                                    <SimpleTextField
                                                        id="time"
                                                        label="Duration"
                                                        type="time"
                                                        defaultValue="02:00"
                                                        handler={(event)=>{
                                                            this.setState({
                                                                eventDuration: event.target.value
                                                            })
                                                        }}
                                                        property={classes.typo}

                                                    />
                                                </Grid>
                                            </Grid>
                                        </ToolBar>
                                        <CustomButton
                                            color="primary"
                                            variant="outlined"
                                            name="Add Item"
                                            handler={this.handleAddItem}
                                            property={classes.button}
                                        />

                                       <SelectItem open={this.state.openItemMenu}
                                                   category={this.state.itemCategory}
                                                   categories={this.state.categories}

                                                   handleClose={()=>{
                                                       this.setState({
                                                           openItemMenu: false
                                                       })
                                                   }}
                                                   imageUrl={this.state.imageUrl}
                                                   handleSubmit={()=>{
                                                       this.setState({
                                                           openItemMenu: false
                                                       })

                                                       const {
                                                           itemName,
                                                           itemCategory,
                                                           itemDescription,
                                                           startingBid,
                                                           selectedImage
                                                       }=this.state
                                                       let firstPostingData = {
                                                           itemName: itemName,
                                                           itemDescription: itemDescription,
                                                           itemCategory: itemCategory,
                                                           startingBid: startingBid
                                                       }
                                                       //TODO LOTS OF CRABS
                                                      let secondPostingData = new FormData()
                                                       secondPostingData.append('file',selectedImage,'image.jpg')
                                                       // postingData.append('itemName',itemName)
                                                       // postingData.append('itemDescription',itemDescription)
                                                       // postingData.append('startingBid',startingBid)
                                                       // let imagePostingData = new FormData()
                                                        console.log("IMAGE",selectedImage,"DATA",secondPostingData)
                                                       let itemResponse = {}
                                                       axios({
                                                           method: 'POST',
                                                           url: `http://localhost:8080/items`,
                                                           headers: {
                                                               'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header
                                                           },
                                                           data: firstPostingData
                                                       }).then((response)=>{
                                                           itemResponse = response.data
                                                           axios({
                                                               method: 'POST',
                                                               url: `http://localhost:8080/uploadFile/${response.data.itemId}`,
                                                               headers: {
                                                                   'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header,
                                                                    'Content-Type': 'multipart/form-data'
                                                               },
                                                               data: secondPostingData
                                                           }).then((response)=>{
                                                                itemResponse={...itemResponse,image:response.data.fileDownloadUri}
                                                                console.log("ITEMRESPONSE",itemResponse)
                                                                axios({
                                                                    method: 'PUT',
                                                                    url: `http://localhost:8080/items`,
                                                                    headers: {
                                                                        'Authorization':JSON.parse(localStorage.getItem(USER_TOKEN)).header,
                                                                        'Access-Control-Allow-Origin': '*',
                                                                        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                                    },
                                                                    data: itemResponse
                                                                }).then(response=>{
                                                                    console.log("RESPONSE first",response)
                                                                })
                                                           })
                                                       })

                                                   }}
                                                   handleImage={this.handleSelectionOfImage.bind(this)}
                                                   handleDescription={(event)=>{
                                                       this.setState({
                                                        itemDescription: event.target.value
                                                       })
                                                   }}
                                                   handleName={(event)=>{
                                                       this.setState({
                                                           itemName: event.target.value
                                                       })
                                                   }}
                                                   handleStartingBid={(event)=>{
                                                       this.setState({
                                                           startingBid: event.target.value
                                                       })
                                                   }}
                                                   handleCategory={(event)=>{
                                                       this.setState({
                                                           itemCategory: event.target.value
                                                       })
                                                   }}
                                                   title="Pick Item"/>
                                    </Grid>
                                     <Grid item xs={3}>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
            </div>
        )
    }

}

SellProductForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellProductForm);