import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
        maxWidth: 200,
        height: "20%",
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "0px",
        marginBottom: "5px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

function ProductCard(props) {
    const { classes,image,description,title } = props;
    return (
        <div>
            <Card
                className={classes.card}
                square
            >
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </div>
    );
}

ProductCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);