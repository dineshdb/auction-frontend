import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const styles = theme => ({
    card: {
        margin: theme.spacing.unit,
        fontSize: '12px'
    },
    media: {
        margin: theme.spacing.unit,
        height: 0,
        paddingTop: '56.25%'
    },
    actions: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing.unit,
        width: "100%"
    },
    flex: {
        display: 'flex',
    },
    right: {
        marginLeft : 'auto'
    }
});

class Product extends React.Component {
    state = {
    };

    render() {
        const { title,maxBid,image, actionName, brief, id} = this.props.item;
        const { classes, baseUrl } = this.props
        return (
            <Card elevation={2} className={classes.card}>
                <CardMedia className={classes.media} image={image} title={title}/>
                <CardContent>
                    <div className={classes.flex}>
                        <Typography gutterBottom variant="headline" component="h3">
                        {title}</Typography>
                        <Typography
                            className={classes.right}
                            style={{
                                fontWeight: 400,
                                color: "#6b6b6b"
                            }}
                        > {maxBid}
                        </Typography>
                    </div>
                    <Typography
                            className={classes.brief}
                            style={{
                                fontWeight: 400,
                                color: "#6b6b6b"
                            }}
                        >{brief}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton size="small">
                            <FavoriteIcon/>
                        </IconButton>
                        <Link to={baseUrl + id} className={classes.right}>
                            Details
                        </Link>
                    </CardActions>
                </Card>
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