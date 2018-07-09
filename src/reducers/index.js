import {combineReducers} from 'redux'
import newUsers from './newUsers'
import userStatus from './userStatus'
export default combineReducers({
    newUsers,
    userStatus

})