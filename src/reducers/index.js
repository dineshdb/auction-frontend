import {combineReducers} from 'redux'
import newUsers from './newUsers'
import userStatus from './userStatus'
import categories from './categories'
import userProducts from './userProducts'
export default combineReducers({
    newUsers,
    userStatus,
    categories,
    userProducts

})