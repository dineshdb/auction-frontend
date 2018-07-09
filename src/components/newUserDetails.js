import React from 'react'
import {connect} from 'react-redux'

class Renderer extends React.Component{
    state={
        users: []
    }
    render()
    {
        return <div>
                {console.log(this.props.users)}
            </div>
    }
}
function mapStateToProps(state){
    console.log(state)
    return{
        users: state.users
    }
}
export default connect(mapStateToProps)(Renderer)