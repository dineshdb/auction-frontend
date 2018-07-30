import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProductCard from './product-card'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
let styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 20
    },
    item : {
        maxWidth: 260,
        maxHeight: "80%"
    },
    mainRoot:{
        color: "white",
        margin: theme.spacing.unit*10
    }
})
class TileView extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render(props){
        const {classes, items, basePath} = this.props
        return (
            <Paper
               className={classes.mainRoot}
               square
            >
            <Grid container className={classes.root} spacing={10}>
                {items.map(value =>{
                console.log("ITEM DETAILS",value)
                return(
                    <Grid key={value} item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
                    <ProductCard 
                    item={value} 
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
};

export default withStyles(styles)(TileView);