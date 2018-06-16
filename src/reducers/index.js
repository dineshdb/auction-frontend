
import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import appBarStatus from './appBarStatus'

export default combineReducers({
    appBarStatus,
    form: formReducer
})