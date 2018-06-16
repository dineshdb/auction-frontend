import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
const styles = {
    pad:{
        marginBottom: 4,
        marginTop: 10
    },
    searchText:
    {
        color: "red"
    }

}

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            activeIcon: false
        }
        
    }
    handleSearchIcon(){
            this.setState({
                activeIcon: true
            })
    }
    handleSearchBar(){
        this.setState({
            activeIcon: false
        })
    }
    render(){
        const {classes} = this.props;
        if (!this.state.activeIcon){
            return (
            <div>
                <IconButton className={classes.pad} onClick = {this.handleSearchIcon.bind(this)} color="inherit" aria-label="Search">
                    <SearchIcon/>
                </IconButton>
            </div>
            )
        }
        else{
            return(
                <div>
                    <TextField className = {classes.pad}
                            autoFocus
                            className = {classes.searchText}
                            margin="dense"
                            id="search"
                            label="Search"
                            type="text"
                            onBlur = {this.handleSearchBar.bind(this)}
                    />

                </div>

            )
        }

        
    }
}
SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchBar);



