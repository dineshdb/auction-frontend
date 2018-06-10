import React from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../actions/index'
import {bindActionCreators} from 'redux'
import UserInfo from './userInfo'

class UserList extends React.Component{

    createListItems(){
        return this.props.users.map((user) => {
            return (
                <div>
                <li key={user.id}
                    onClick= {() => this.props.selectUser(user)}
                >
                    {user.first} {user.last}
                </li>
                    <br/>
                    <br/>
                    <UserInfo/>
                </div>


            )
        })
    }
    render()
    {
        return (
            <ul>
                {this.createListItems()}
            </ul>
        )
    }

}
function mapStateToProps(state){
    return {
        users: state.users
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectUser: selectUser
    },dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(UserList);

