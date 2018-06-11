import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

class Property extends React.Component {
    render() {
        return (

            <Paper elevation={4} style={{height: "100%",width: "20%"}}>
                <Grid container>
                    <Grid item lg>
                        <Typography variant="headline" component="h6">
                            {this.props.type}
                        </Typography>
                    </Grid>
                    <Grid item lg>
                        <Typography component="h7"  style = {
                            {
                                marginLeft: 20
                            }
                        }>
                            {this.props.value}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>


        );
    }
}

Property.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (Property);