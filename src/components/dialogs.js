import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {CustomButton} from "./buttons";
import PropTypes from 'prop-types'
import {SimpleTextField} from "./textFields";
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Add from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import axios from 'axios'
import {USER_TOKEN} from "../definitions/index";
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import store from '../store'

const styles = (theme) => {
    return{
        textField: {
            width: "100%",
            marginTop: "5%"
        },
        card: {

            marginTop: "8%",
            height: "250px",
            width: "100%",

        },
        media: {
            height: 0,
            paddingTop: '100%',
        },
        formControl: {
            minWidth: 120,
            marginTop: theme.spacing.unit
        },
    }

}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class SelectItem  extends React.Component{

    constructor(props){
        super(props)
        this.state={
            category: "Category",
            categories: [],
            newCategoryOpen: false,
            newCategory: ""
        }
    }
    componentDidMount() {
        let categories = []
        if(store.getState().header){
            axios({
                method: 'GET',
                url: `http://localhost:8080/categories`,
                headers: {
                    'Authorization':store.getState().header
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

    }
    render(){
        this.fileInput = React.createRef()
        let {open,
            handleClose,
            title,
            handleName,
            handleDescription,
            handleStartingBid,
            handleImage,
            handleSubmit,
            handleCategory,
            classes,
            imageUrl,
            category
        } = this.props

        return (




            <div >
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    fullWidth
                    style={{height: "80%"}}
                >
                    <DialogTitle id="select-item">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing="24">
                            <Grid item xs = {6}>
                                <Card className={classes.card}>
                                    {
                                        imageUrl && (
                                            <CardMedia
                                                className={classes.media}
                                                image={imageUrl}
                                            />
                                        )
                                    }

                                </Card>
                                <input style={{display: 'none'}}
                                       ref = {fileInput => this.fileInput = fileInput}
                                       type="file"
                                       onChange={handleImage}
                                />
                            </Grid>
                            <Grid item xs = {6}>
                                <div>
                                    <SimpleTextField
                                        type="text"
                                        handler={handleName}
                                        placeholder="Name"
                                        property={classes.textField}



                                    />
                                </div>
                                <div>
                                    <SimpleTextField
                                        type="text"
                                        handler={handleDescription}
                                        placeholder="Description"
                                        textArea="true"
                                        property={classes.textField}



                                    />
                                </div>
                                <div>
                                    <SimpleTextField
                                        type="text"
                                        handler={handleStartingBid}
                                        placeholder="Starting Bid"
                                        property={classes.textField}
                                        style={{width: "50%"}}

                                    />
                                </div>
                                {
                                    (
                                        <div>
                                            <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="demo-controlled-open-select">Category  </InputLabel>
                                            <Select
                                                value={this.props.category}
                                                onChange={handleCategory}
                                                name="category"
                                                inputProps={{
                                                    id: 'demo-controlled-open-select',
                                                    name: 'category'
                                                }}
                                            >
                                                {
                                                    this.state.categories.map((category)=>{

                                                        return <MenuItem
                                                            value={category.categoryName}
                                                        >{category.categoryName}
                                                        </MenuItem>
                                                    })

                                                }
                                            </Select>
                                            </FormControl>
                                            <a
                                                style={{
                                                        color: '#ff74ad',
                                                       float: "right",
                                                        '&:hover':{
                                                           color: "#11a6e5"
                                                        }
                                                }}
                                                href='#'
                                                color="secondary"
                                                onClick={()=>{
                                                    this.setState({
                                                        newCategoryOpen: true
                                                    })
                                                }}
                                            >
                                                Add New <Add/>
                                            </a>
                                            <Collapse in = {this.state.newCategoryOpen}>
                                                <TextField
                                                    type="text"
                                                    onChange={(event)=>{
                                                       this.setState({
                                                       newCategory: event.target.value
                                                    })
                                                    }}

                                                />
                                            </Collapse>
                                        </div>
                                    )
                                }

                                <div style={{margin: "5%"}}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        aria-label="Add"
                                        className={classes.button}
                                        onClick = {()=>this.fileInput.click()}
                                        style={{marginLeft: "1%"}}
                                    >Upload Image
                                        <Add />
                                    </Button>
                                </div>

                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <CustomButton
                            name="Cancel"
                            handler={handleClose}
                            variant="outlined"
                            color="secondary"
                        />

                        <CustomButton
                            name="Submit"
                            handler={handleSubmit}
                            variant="contained"
                            color="primary"
                        />
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}
SelectItem.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    handleName: PropTypes.func.isRequired,
    handleDescription:PropTypes.func.isRequired,
    handleStartingBid:PropTypes.func.isRequired,
    handleImage:PropTypes.func.isRequired,
    handleCategory: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired
}
function mapStateToProps(state){
    return {
        categories: state.categories
    }
}
export default (withStyles(styles)(SelectItem))