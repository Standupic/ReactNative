import {combineReducers} from 'redux';
import Counter from './CounterReducer';
import auth from './auth'

export default combineReducers({
    auth: auth,
    counter: Counter
})