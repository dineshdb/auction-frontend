import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProductCard from './product-card'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
let styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 20,
        marginTop: 0,
    },
    item : {
        maxWidth: "250px",
        maxHeight: "80%"
    },
    mainRoot:{
        color: "white",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    title:{
        fontWeight: 'lighter',
        fontSize: "20px",
        padding: 25
    }
})
class TileView extends React.Component {
    constructor(props){
        super(props)
    }
    render(props){
        const {classes, items, basePath, title} = this.props
        if(items.length===0)
            return(<i></i>)
        return (
            <Paper
               className={classes.mainRoot}
               square
               elevation={0}
            >
            <Typography className={classes.title} align="center">
                {title}
            </Typography>

            <Grid container className={classes.root} spacing={10}>
                {items.map(value =>{
                return(
                    <Grid key={value} item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
                    <ProductCard 
                    item={value}
                    isFavorite={value.isFavorite}
                    baseUrl={basePath}
                    />
                    </Grid>
                    )  
                }
                )}
            </Grid>
            </Paper>

        )
    }
}

TileView.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
};

export default withStyles(styles)(TileView);