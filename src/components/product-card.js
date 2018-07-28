import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import store, {toggleFavorite} from '../store'
import {connect} from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';

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
    constructor(props){
        super(props)
        this.state = {
            isFavorite : this.isFavorite(props.item.itemId),
        }
    }
    isFavorite(id){
        return store.getState().favorites.includes(id)
    }
    componentDidMount(){
        store.subscribe(() =>{
            this.setState({
                isFavorite: this.isFavorite(this.props.item.itemId)
            })
        })
    }
    handleFavorite = (e) => {
        let {itemId} = this.props.item
        store.dispatch(toggleFavorite(itemId))
        console.log(this.state.isFavorite, store.getState().favorites)
    }
    render() {
        const { itemName,maxBid, bid,image, actionName, itemDescription, itemId} = this.props.item;
        const { classes, baseUrl } = this.props
        return (
            <Card elevation={2} className={classes.card}>
                <CardMedia className={classes.media} image={image} itemName={itemName}/>
                <CardContent>
                    <div className={classes.flex}>
                        <Typography gutterBottom variant="headline" component="h3">
                        {itemName}</Typography>
                        <Typography
                            className={classes.right}
                            style={{
                                fontWeight: 400,
                                color: "#6b6b6b"
                            }}
                        > {maxBid} </Typography>
                    </div>
                    <Typography
                        className={classes.brief}
                        style={{
                            fontWeight: 400,
                            color: "#6b6b6b"
                        }}
                    >{itemDescription}</Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title="Save to favorites">
                    <IconButton size="small" onClick={this.handleFavorite}>
                        <Icon>{this.state.isFavorite ? "favorite": "favorite_outline"}</Icon>
                    </IconButton>
                    </Tooltip>
                    <Link to={baseUrl + itemId} className={classes.right}> Details</Link>
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
    itemId: PropTypes.string.isRequired
};
function mapStateToProps(state){
    return {
        isFavorite: state.isFavorite
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Product))