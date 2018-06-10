import {combineReducers} from 'redux';
import ProductReducer from './product-reducer'
const allReducers =  combineReducers({
    products: ProductReducer
});
export default allReducers;
