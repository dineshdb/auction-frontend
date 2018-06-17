
import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import appBarStatus from './appBarStatus'
import productStore from './products'
export default combineReducers({
    appBarStatus,
    form: formReducer,
    productStore
})