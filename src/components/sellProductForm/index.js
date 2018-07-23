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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
      width: "65%"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

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
            openItemMenu: false

        }
        this.fileInput = React.createRef()
    }
    componentDidMount(){
        /*
        Fetch the categories available
         */

        /*
            Uncomment the following code
         */

        // const {url} = "" //url is the api's url to get the categories
        // axios.get(url,{crossDomain: true})
        //     .then((res) => {
        //     this.setState({
        //         categories: res.data.categories
        //     })
        //     })
        //     .catch((err)=>{
        //     console.log("Hey got error",err)
        //     })

        /*
            Remove the below code after the api has been made
         */
        let categories = ["Artifact","Art","Fashion","Vehicle","Instrument"]
        this.setState({
            categories: categories
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
                    Product Details

                </Typography>

                    <Grid container spacing="24">
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={24} className={classes.margin}>
                                    <Grid item xs={4} style={{ borderRight: '0.1em solid ',borderRightColor: "#bfbfbf", padding: '0.5em'}}>
                                        <div>
                                            <Typography className={classes.cardTitle}>
                                                Preview
                                            </Typography>
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={this.state.imageUrl}
                                                    title={this.state.title}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="headline" component="h2" style={{fontWeight: "lighter"}}>
                                                        {this.state.title}
                                                    </Typography>
                                                    <Typography className={classes.cardP}>
                                                        {this.state.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <input style={{display: 'none'}}
                                               ref = {fileInput => this.fileInput = fileInput}
                                               type="file"
                                               onChange={this.handleSelectionOfImage}
                                        />
                                        <Button
                                            onClick = {()=>this.fileInput.click()}
                                            variant="outlined"
                                            color={"primary"}
                                            className={classes.button}
                                            size="large"
                                        >
                                            Upload Image
                                        </Button>



                                    </Grid>
                                    <Grid item xs={8}>
                                        <ToolBar >
                                            <Grid container spacing="24">
                                                <Grid item xs="3" >
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Title*
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs="9">
                                                    <TextField
                                                        margin="dense"
                                                        type="text"
                                                        placeholder="Name"
                                                        className={classes.typo}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                title: event.target.value
                                                            })
                                                        }}
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
                                                    <TextField
                                                        margin="dense"
                                                        type="text"
                                                        placeholder="Description"
                                                        multiline
                                                        className={classes.typo}
                                                        style={{marginBottom: "20px"}}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                description: event.target.value
                                                            })
                                                        }}
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
                                                    <TextField
                                                        id="time"
                                                        label="Event Start"
                                                        type="time"
                                                        defaultValue="12:00"
                                                        style={{
                                                            maxWidth: "300%",
                                                        }}

                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            step: 300, // 5 min
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs="2">
                                                </Grid>
                                                <Grid item xs="1">
                                                    <Typography
                                                        className={classes.leftName}>
                                                        Duration*
                                                    </Typography>
                                                    <TextField
                                                        id="time"
                                                        label="Duration"
                                                        type="time"
                                                        defaultValue="02:00"
                                                        style={{
                                                            maxWidth: "300%",
                                                        }}

                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            step: 300, // 5 min
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </ToolBar>
                                        <Button
                                            color="primary"
                                            className={classes.button}
                                            variant="outlined"
                                            aria-label="Add"
                                            onClick={this.handleAddItem}
                                        >
                                            Add Event
                                            <Add/>
                                        </Button>
                                        <Dialog
                                            open={this.state.openItemMenu}
                                            TransitionComponent={Transition}
                                            aria-labelledby="item-dialog"
                                            aria-describedby="item-dialog-description"
                                        >
                                            <DialogContent>

                                        </DialogContent>

                                        </Dialog>
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