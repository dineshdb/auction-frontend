import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//import Search from './search.js'
import Menu from './menu.js'
import SearchBar from './searchbar.js'
const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    typography: {
        marginLeft: 200,
        height: 40
    }

};

class NavigationBar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="sticky" color="primary">
                    <Toolbar>
                        <Menu/>
                        <Typography variant="title" color="inherit" className={classes.typography}>
                           Jumanji
                        </Typography>
                        <SearchBar/>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationBar);