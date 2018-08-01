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
import {participateInAuction} from "../products";
import Divider from '@material-ui/core/Divider'
import {subscribeAuction} from "../socket";

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit*1,
        fontSize: '16px',
        maxWidth: 250,
       
    },
    media: {
        marginLeft: theme.spacing.unit*3,
        marginRight: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit,
        height: 0,
        paddingTop: '56.25%'
    },
    actions: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing.unit*3,
        width: "100%"
    },
    divider: {
        marginTop: theme.spacing.unit*2,
        marginLeft: theme.spacing.unit*3,
        marginRight: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit,
        height: 0,
        paddingTop: "1%"
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
            hovered: false,
            elevation: 0
        }
    }
    isFavorite(id){
        return store.getState().favorites.includes(id)
    }
    componentDidMount(){
        store.subscribe(() =>{
            this.setState({
                isFavorite: this.isFavorite(this.props.item.auction)
            })
        })
    }
    handleFavorite = (e) => {
        let {auction} = this.props.item
       participateInAuction(auction).then(res=>{
           store.dispatch(toggleFavorite(auction))
       })

    }
    render() {
        const { itemName,maxBid, bid,image, actionName, itemDescription, itemId,startingBid,auction,isFavorite} = this.props.item;
        const { classes, baseUrl } = this.props
        return (<div onMouseEnter={()=>{
                this.setState({
                    elevation: 20
                })
            }}
            onMouseLeave={()=>{
                this.setState({
                    elevation: 0
                })
        }}
            >
            
            <Card square elevation={this.state.elevation} className={classes.card}
            >
             <CardActions>
                    <Tooltip title="Save to favorites">
                    <IconButton color="secondary" size="small" onClick={this.handleFavorite}>
                        <Icon>{(this.state.isFavorite | isFavorite) ? "favorite": "favorite_outline"}</Icon>
                    </IconButton>
                    </Tooltip>
                </CardActions>
            
                <Link to={baseUrl + itemId} className={classes.right}> 
                <CardMedia  className={classes.media} image={image} itemName={itemName}>
                
                </CardMedia>
                
                    
                    <Divider className={classes.divider}/>
                   
                
               
                <CardContent>
                    <div className={classes.flex}>
                        <Typography gutterBottom variant="headline" component="h3" style={{fontWeight: "lighter"}}>
                        {itemName}</Typography>
                        <Typography
                            className={classes.right}
                            style={{
                                fontWeight: 400,
                                color: "#6b6b6b"
                            }}
                        > {maxBid} </Typography>
                    </div>
                     <Typography gutterBottom variant="headline" component="h3">
                        Rs.{startingBid}</Typography>
                </CardContent>
                </Link>
                
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
    time: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired
};
function mapStateToProps(state){
    return {
        isFavorite: state.isFavorite
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Product))