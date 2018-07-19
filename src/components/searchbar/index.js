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
import DialogContent from '@material-ui/core/DialogContent'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'


const styles = theme => ({
    root: {
        flexGrow: 0,
        marginTop: "0px",
        fontWeight: "lighter",
        backgroundColor: "#2bc6ea"


    },
    paper:{
      paddingTop: "30px",
      paddingBottom: "30px",
      paddingLeft: "30px",
      paddingRight: "30px",
        backgroundColor: "#2bc6ea"
    },
    link: {
        fontWeight: "lighter",
        color: "white",
        '&:hover': {
            textDecoration: "underline"
        }

    },
    button: {
        marginTop: "10px",
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
            selectedCategory: "Categories"

        }
    }
    componentDidMount()
        {
            let categories = [
                "watches",
                "jewellery",
                "artifacts",
                "arts",
                "watches",
                "jewellery",
                "artifacts",
                "arts",
                "watches",
                "jewellery",
                "artifacts",
                "arts",
                "watches",
                "jewellery",
                "artifacts",
                "arts",
                "watches",
                "jewellery",
                "artifacts",
                "arts",
                "watches",
                "jewellery",
                "artifacts",
                "arts"
            ]
            this.setState({
                categories: categories
            })
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
                    <Toolbar
                        position="static"
                        className={classes.root}
                        elevation="0px"
                    >
                        <Grid container spacing={24}>
                            <Grid
                                item
                                xs={6}
                            >
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
                            </Grid>


                            <Grid item xs={4}>
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
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    onClick={this.handleSearchButton.bind(this)}
                                    className={classes.button}
                                    color="primary"

                                >
                                    Search
                                </Button>
                            </Grid>





                        </Grid>

                    </Toolbar>
                    <Collapse
                        in={this.state.categoryOpen}
                        >
                        <Paper
                            className={classes.paper}
                            color="secondary"
                        >
                            <Grid container spacing = {24}>
                                <Grid item xs="3">
                                    {this.state.categories.map((category,key)=> {
                                        if (key < 5)
                                        return(
                                            <div>
                                                <Link to = "#"
                                                    className = {classes.link}>
                                                    {category}
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
                                                        {category}
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
                                                        {category}
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
                                                        {category}
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

                </div>
            )
    }
}
SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {


    }
}
export default connect(mapStateToProps)(withStyles(styles)(SearchBar))
