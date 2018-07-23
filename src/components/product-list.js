import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const styles = theme => ({
    root : {
        width: '100%',
        margin: 15
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    item:{
        margin: 10,
        minWidth: 350,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

});

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Typography gutterBottom variant="headline" component="h2">
                    Title
                </Typography>

                <div className={classes.container}>
                    {this.state.data.map((product) => {
                        return (
                            <div  className={classes.item}>
                                <Link to={"/product/" + product.id}>
                                    <Card>
                                        <CardMedia
                                            className={classes.media}
                                            image={product.image}
                                            title={product.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="headline" component="h3">
                                                {product.title}
                                            </Typography>
                                            <Typography component="p">
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);