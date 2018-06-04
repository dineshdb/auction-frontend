import {combineReducers} from 'redux';
import UserReducer from './users-reducer';
import ActiveUser from './activeuser.js'
const allReducers =  combineReducers({
    users: UserReducer,
    activeUser: ActiveUser
});
export default allReducers;
