import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
const style= (theme)=>{
    return {
        margin: theme.spacing.unit
    }
}
class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const {userObject,classes} = this.props
        return<div>

        </div>
    }
}
UserProfile.PropTypes = {
    userObject: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(UserProfile)