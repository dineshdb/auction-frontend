import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
export default function(){
    return <div>
        <Paper position="sticky" color="secondary" square elevation={4}
            style={{color: "white",backgroundColor: "#9d9d9d"}}
        >
        <Grid container spacing= {24}>
            <Grid item xs={4}>
                {/*<h4 style={{marginLeft: '20px'}}> Contact<br/>01-123456</h4>*/}
            </Grid>
            <Grid item xs={4}>
                {/*<h4>Location:*/}
                    {/*<br/>*/}
                    {/*Patan, Lalitpur, Nepal</h4>*/}
            </Grid>
        </Grid>
        <br/>
        <br/>
        <br/>
        <br/>
        </Paper>
       

    </div>
}