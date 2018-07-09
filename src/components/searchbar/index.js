import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import {Redirect} from 'react-router-dom'




const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#66adce",
        marginTop: "0px"


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
            selectedCategory: "select category"

        }
    }
    componentDidMount()
        {
            let categories = [
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
                    <AppBar position="static" className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid item xs={4}>
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
                                <List>
                                <ListItem button
                                          color="inherit"
                                          onClick={this.handleCategoryClick}
                                          style={{
                                              color: "black",
                                              backgroundColor: "#e0e0e0",
                                              borderRadius: "5px"
                                          }}
                                >

                                    {this.state.selectedCategory}
                                    {this.state.categoryOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={this.state.categoryOpen} timeout="auto" unmountOnExit>
                                    <List
                                        component="div"
                                        disablePadding
                                    >
                                        {this.state.categories.map((category,key) => {
                                            return <div>
                                                    <ListItem
                                                        key={key}
                                                        button
                                                        className={classes.nested}
                                                        onClick = {this.handleSelectedCategory(category)}
                                                    >
                                                        {category}
                                                    </ListItem>
                                                </div>
                                        })}

                                    </List>
                                </Collapse>
                                </List>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={this.handleSearchButton.bind(this)}
                                    style={{
                                        marginTop: "10px"
                                    }}
                                >
                                    Search
                                </Button>
                            </Grid>





                        </Grid>

                    </AppBar>
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
