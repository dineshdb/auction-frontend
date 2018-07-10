import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
      marginLeft: "40px",
      marginRight: "40px",
      marginTop: "20px",
    },
    paper: {
      marginLeft: "20px",
        marginTop: "40px"
    },
    margin: {
        margin: theme.spacing.unit,
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
        border: '1px solid #ced4da',
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
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
});


class SellProductForm extends React.Component {

    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Typography

                    style={{
                        fontSize: "30px",
                        color: "black",
                        fontWeight: "lighter"
                    }}
                >
                    Product details
                </Typography>

                <Paper>
                    <div
                        className={classes.paper}
                    >
                        <Grid container spacing="24">
                            <Grid item xs = "2">
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "30px"
                                    }}
                                >
                               <Typography

                                   style={{
                                       fontSize: "25px",
                                       fontWeight: "lighter"

                                   }}
                               >Title</Typography>
                                </div>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "30px"
                                    }}
                                >
                                    <Typography

                                        style={{
                                            fontSize: "25px",
                                            fontWeight: "lighter"

                                        }}
                                    >Subtitle</Typography>
                                </div>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "30px"
                                    }}
                                >
                                    <Typography

                                        style={{
                                            fontSize: "25px",
                                            fontWeight: "lighter"

                                        }}
                                    >Category</Typography>
                                </div>

                            </Grid>
                            <Grid item xs = "6">
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "30px"
                                    }}
                                >
                                <TextField
                                    id="bootstrap-input"
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
                                    fullWidth
                                />
                                </div>
                                <div>
                                    <TextField
                                        id="bootstrap-input"
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
                                        fullWidth
                                    />
                                </div>

                            </Grid>
                            <Grid item xs = "4">

                            </Grid>

                        </Grid>

                    </div>
                </Paper>
            </div>
        )
    }

}

SellProductForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellProductForm);