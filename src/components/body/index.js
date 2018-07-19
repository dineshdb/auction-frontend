import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProductCard from '../productCard/index'
import Home from '../../assets/images/home.jpg'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ToolBar from '@material-ui/core/Toolbar'

const styles = {
    text: {
        fontSize: "30px",
        fontWeight: "lighter",
        color: "black",
        paddingTop: "30px",
        paddingBottom: "30px",

    },
    product:{
      marginLeft: "100px",
      marginRight: "10px",
        paddingLeft: "100px"
    },
    paper:{
        marginTop: "0px",
        backgroundColor: "#ffffff",
        marginLeft: "100px",
        marginRight: "100px",
        marginBottom: "100px"
    }
};

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[1,2,3,4,5]
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
                <Paper
                    className={classes.paper}
                    elevation="0"
                   >
                    <Typography
                        className={classes.text}
                        align="center"
                    >
                        GALLERY
                    </Typography>
                </Paper>
                <Paper
                    className={classes.paper}
                    elevation="0"
                    square
                    >
                    {this.state.data.map(() =>{
                        return (
                            <ToolBar >
                                {this.state.data.map((product) => {
                                    return (
                                        <ProductCard
                                            image={Home}
                                            title="Helo"
                                            description="HEllo from the other side bla bla bla"

                                        />
                                    )
                                })}


                            </ToolBar>
                        )
                    })}


                </Paper>
            </div>

        )


}

}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);