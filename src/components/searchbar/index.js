import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider'
import {Redirect} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import IconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'
import {USER_TOKEN,USER_PRODUCTS} from "../../definitions/index";
import {categoriesAction} from '../actions/categories'
import store from '../../store'

const styles = theme => ({
    root: {
        flexGrow: 0,
        marginTop: "0px",
        fontWeight: "lighter",
    },
    paper:{
      padding: "30px",
        backgroundColor: "#2196F3"
    },
    link: {
        fontWeight: "lighter",
        color: "white",
        '&:hover': {
            textDecoration: "underline"
        }

    },
    button: {
        margin: "10px",
        color: "white",
        fontWeight: "lighter",
        fontSize: "15px"

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

    },
    bootstrapFormLabel: {
        fontSize: 18,
        color: "white"
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,

    }
});
class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: "",
            search: false,
            categoryOpen: false,
            categories: [],
            selectedCategory: "Categories",
            login: false
        }
    }
    componentDidMount(){
        let categories = []
        if(store.getState().user.header){
            axios({
                method: 'GET',
                url: `http://localhost:8080/categories`,
                headers: {
                    'Authorization': store.getState().user.header
                }
            }).then(response =>{
                console.log("CATEGORIES",response)
                response.data.map((category) => {
                    categories.push(category)
                })
                categories.sort((a,b) => a.categoryName < b.categoryName ? -1 : 1)
                this.setState({
                    categories: categories
                })
            }).catch(err=>{
                console.log("ERROR",err)
                Window.Refresh
            })
        }

    }
        
    handleSearch(event){
        this.setState({
            searchName: event.target.value
        })
    }
    handleSearchButton(){
        this.setState({
            search: true
        })
        //this.fetchSearchedItem()
    }
    /*

        after search button has been clicked search from api
     */

    fetchSearchedItem(){
        const {searchName} = this.state
        let api_path = ``
        if(searchName.length > 0){
            axios.get(api_path,{

            }
            ).then(response => {

            })
        }
    }
    handleCategoryClick = () => {
        this.setState(state => ({ categoryOpen: !state.categoryOpen }));
    }
    handleSelectedCategory = name => event => {
        this.setState({
            selectedCategory: name
        })
        this.handleCategoryClick()
    }
    render() {
        const {classes} = this.props

            return (
                <div >
                    <Divider/>
                    <AppBar
                        position="static"
                        className={classes.root}
                        elevation="0px"

                    >
                        <Grid container spacing={24} >
                            <Grid
                                item
                                xs={8}
                            >
                                <Toolbar>
                                <Button
                                    onClick = {this.handleCategoryClick.bind(this)}
                                    className={classes.button}
                                >
                                    {this.state.selectedCategory}
                                    {this.state.categoryOpen?<ExpandLess/>:<ExpandMore/>}

                                </Button>
                                <Button
                                    className={classes.button}
                                >
                                    Ending Today
                                </Button>
                                <Button
                                    className={classes.button}
                                >
                                    New Today
                                </Button>
                                    <Button
                                        className={classes.button}
                                        onClick={ ()=> {
                                           let user = JSON.parse(localStorage.getItem(USER_TOKEN))
                                            if(!user){
                                               this.setState({
                                                   login: true
                                               })
                                            }
                                            else{
                                                localStorage.setItem(USER_PRODUCTS,JSON.stringify({
                                                    on: true
                                                }))
                                            }
                                        }}
                                    >
                                        My Products
                                    </Button>
                                </Toolbar>
                            </Grid>


                            <Grid item xs={4}>
                                <Toolbar>
                                <TextField
                                    style={{color: "white"}}
                                    name="Search"
                                    margin="dense"
                                    type="text"
                                    placeholder="Search..."
                                    onChange={this.handleSearch.bind(this)}
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

                                    <IconButton>
                                        <Search/>
                                    </IconButton>

                                </Toolbar>
                            </Grid>
                        </Grid>

                    </AppBar>
                    <Collapse
                        in={this.state.categoryOpen}
                        >
                        <Paper
                            className={classes.paper}


                        >
                            <Grid container spacing = {24}>
                                <Grid item xs="3">
                                    {this.state.categories.map((category,key)=> {
                                        if (key < 5)
                                        return(
                                            <div>
                                                <Link to = "#"
                                                    className = {classes.link}>
                                                    {category.categoryName}
                                                </Link>
                                                <br/>
                                            </div>
                                        )

                                    })}
                                </Grid>
                                <Grid item xs = "3">
                                    {this.state.categories.map((category,key)=> {
                                        if (key >= 5 && key < 10)
                                            return(
                                                <div>
                                                    <Link to = "#" className = {classes.link}>
                                                        {category.categoryName}
                                                    </Link>
                                                    <br/>
                                                </div>
                                            )

                                    })}
                                </Grid>
                                <Grid item xs = "3">

                                    {this.state.categories.map((category,key)=> {
                                        if (key >= 10 && key < 15)
                                            return(
                                                <div>
                                                    <Link to = "#" className = {classes.link}>
                                                        {category.categoryName}
                                                    </Link>
                                                    <br/>
                                                </div>
                                            )

                                    })}
                                </Grid>
                                <Grid item xs = "3">

                                    {this.state.categories.map((category,key)=> {
                                        if (key >= 15 && key < 20)
                                            return(
                                                <div>
                                                    <Link
                                                        to = "#"
                                                        className={classes.link}
                                                        >
                                                        {category.categoryName}
                                                    </Link>
                                                    <br/>
                                                </div>
                                            )

                                    })}
                                </Grid>

                            </Grid>
                        </Paper>
                    </Collapse>
                    {
                        //TODO The link below should be for /search/category=""
                    }
                    {
                        this.state.search && (<Redirect to = "/signup" />)
                    }
                    {
                        this.state.login && <Redirect to = '/login' />
                    }
                </div>
            )
    }
}
SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.object
};

function mapStateToProps(state){
    return {
//        categories: state.categories.categories

    }
}
export default connect(mapStateToProps)(withStyles(styles)(SearchBar))
