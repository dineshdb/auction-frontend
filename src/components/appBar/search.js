import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = {
    searchButton : {
        marginLeft: -20,
        marginRight: 50,
        float: 'right',

    }
}

export default class Search extends React.Component{
    render(){
        return <div>
            <IconButton className={styles.searchButton} color = "white">
            <SearchIcon/>
            </IconButton>
        </div>
    }
}

