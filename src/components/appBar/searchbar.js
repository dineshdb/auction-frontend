import React from 'react'
import TextField from '@material-ui/core/TextField';
import Search from './search.js'
import {withStyles} from '@material-ui/core/styles'
const styles = {
    textField : {
        marginLeft: 600,
        marginRight: 10,
        float: 'right',
        position: 'right'
    }
}

class SearchBar extends React.Component{
    render(){
        const {classes} = this.props
        return <div className={classes.textField}>
            <TextField color="red"
                label="Search"
                />
        </div>
    }
}

export default withStyles(styles)(SearchBar)