import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
const styles = {
    root: {
        flexGrow: 1,
    },
};

function LogoBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography
                        color="inherit"
                        style={{
                            fontSize: "30px",
                            fontWeight: "lighter"
                        }}
                    >
                        BidStellar.com
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

LogoBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogoBar);