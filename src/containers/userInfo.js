import React from 'react'
import { connect } from 'react-redux'

class UserInfo extends React.Component{

    render()
    {
      if(!this.props.user)
      {
          return <h1> select name</h1>
      }
      else{
          return <div>
              {this.props.user.first} {this.props.user.last}
              {this.props.user.description}
          </div>
      }
    }
}
function mapStateToProps(state){
    return {
        user: state.activeUser
    }
}
export default connect(mapStateToProps)(UserInfo)