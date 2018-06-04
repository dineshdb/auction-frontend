import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
    menuButton : {
        marginLeft: -20,
        marginRight: 50,
    }
}

export default class Menu extends React.Component{
    render(){
        return <div>
            <IconButton className={styles.menuButton} color = "white">
                <MenuIcon/>
            </IconButton>
        </div>
    }
}

