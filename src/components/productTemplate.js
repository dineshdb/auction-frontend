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

const styles = theme => ({
    card: {
        maxWidth: 300,
        height: "10%",
        margin: theme.spacing.unit*4
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
});

class Product extends React.Component {
    state = { expanded: false };


    render() {
        const { classes,title,date,time,bid,image } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        title={title}
                    />
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites" color="primary" variant="contained">
                            <AddIcon />
                        </IconButton>
                        Participate
                    </CardActions>
                    <CardMedia
                        className={classes.media}
                        title="Contemplative Reptile"
                        image={image}
                    />
                    <CardContent>
                        <Typography >
                            Bid: {bid}
                        </Typography>
                        <Typography>
                            Date: {date}
                        </Typography>
                        <Typography>
                            Time: {time}
                        </Typography>

                    </CardContent>

                </Card>
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
    time: PropTypes.string.isRequired
};

export default withStyles(styles)(Product)