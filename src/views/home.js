import React from 'react'
import LoginBar from '../components/appBar/index'
import Paper from '../components/product/index'
import Grid from '@material-ui/core/Grid'
export default function()
{
    return (
        <div>
        <LoginBar/>
       
        <Grid container spacing={24}>
            <Grid item xs={3}>
                <Paper/>
            </Grid>
            <Grid item xs={3}>
                <Paper/>
            </Grid>
            <Grid item xs={3}>
                <Paper/>
            </Grid>
            <Grid item xs={3}>
                <Paper/>
            </Grid>
            




                </Grid>
                
        </div>
    )
}