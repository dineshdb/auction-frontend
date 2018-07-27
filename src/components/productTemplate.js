import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import AddIcon from '@material-ui/icons/Add';
import {CustomButton} from "./buttons";
import {Redirect,Link} from 'react-router-dom'


const styles = theme => ({
    card: {

        marginTop: "8%",
        height: "60%",
        maxWidth: 460,
        width: 283,
        margin: theme.spacing.unit,

    },
    media: {
        margin: theme.spacing.unit*3,
        height: 0,
        paddingTop: '56.25%'
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    link: {
        color: "black",
        opacity: "0.8",

    },
    margin: {
        margin: theme.spacing.unit,
        width: "100%"
    }
});

class Product extends React.Component {
    state = {
        expanded: false,
        fireDetails: false,
        path: ""
    };


    render() {
        const { classes,title,date,time,bid,image,id } = this.props;
        let link = `product/${id}`
        return (
            <div>
                <Link to = {link} className={classes.link}>
                <Card
                    elevation={0}
                    square
                    className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={image}
                    />
                    <CardContent>
                        <Typography
                            style={{
                                fontSize: "16px",
                                fontWeight: 400
                            }}
                        >{title}
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                color: "#6b6b6b"
                            }}
                        >Rs. {bid}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <CustomButton
                            property={classes.margin}
                            name="BID NOW"
                            handler={()=>{
                                this.setState({
                                    fireDetails: true,
                                    path: `product/${id}`
                                })
                            }}
                            variant="contained"
                            color="primary"
                            style={{borderRadius: 0}}
                            size="large"
                        />
                    </CardActions>

                </Card>
                {
                    this.state.fireDetails && (
                        <Redirect to = {this.state.path}/>
                    )
                }
                </Link>
            </div>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    bid: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default withStyles(styles)(Product)