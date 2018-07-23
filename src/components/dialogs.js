import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {CustomButton} from "./buttons";
import PropTypes from 'prop-types'
import {SimpleTextField} from "./textFields";
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

const styles = (theme) => {
    return{
        textField: {
            width: "100%",
            marginTop: "5%"
        },
        card: {

            marginTop: "8%",
            height: "200%",
            width: "100%"
        },
        media: {
            paddingTop: '56.25%',
            height: "200%",
            width: "100%"// 16:9
        },
    }

}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class SelectItem  extends React.Component{

    render(){
        this.fileInput = React.createRef()
        let {open,
            handleClose,
            title,
            handleName,
            handleDescription,
            handleStartingBid,
            handleImage,
            handleSubmit,
            classes,
            imageUrl
        } = this.props

        return (
            <div >
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                   // maxWidth
                    maxWidth="md"
                >
                    <DialogTitle id="select-item">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing="24">
                            <Grid item xs = {6}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={imageUrl}
                                    />
                                </Card>
                                <input style={{display: 'none'}}
                                       ref = {fileInput => this.fileInput = fileInput}
                                       type="file"
                                       onChange={handleImage}
                                />
                                <CustomButton
                                    handler = {()=>this.fileInput.click()}
                                    variant="outlined"
                                    color={"primary"}
                                    className={classes.button}
                                    size="large"
                                    name="Upload Image"
                                />
                            </Grid>
                            <Grid item xs = {6}>
                                <div>
                                    <SimpleTextField
                                        type="text"
                                        handler={handleName}
                                        placeholder="Name"
                                        property={classes.textField}



                                    />
                                </div>
                                <div>
                                    <SimpleTextField
                                        type="text"
                                        handler={handleDescription}
                                        placeholder="Description"
                                        textArea="true"
                                        property={classes.textField}



                                    />
                                </div>
                                <div>
                                    <SimpleTextField
                                        type="text"
                                        handler={handleStartingBid}
                                        placeholder="Starting Bid"
                                        property={classes.textField}

                                    />
                                </div>

                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <CustomButton
                            name="Cancel"
                            handler={handleClose}
                            variant="outlined"
                            color="secondary"
                        />
                        <CustomButton
                            name="Submit"
                            handler={handleClose}
                            variant="contained"
                            color="primary"
                        />
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}
SelectItem.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    handleName: PropTypes.func.isRequired,
    handleDescription:PropTypes.func.isRequired,
    handleStartingBid:PropTypes.func.isRequired,
    handleImage:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SelectItem)