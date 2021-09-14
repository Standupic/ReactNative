import {combineReducers} from 'redux';
import Counter from './CounterReducer';
import Auth from './auth'

export default combineReducers({
    Auth: Auth,
    counter: Counter
})