import {combineReducers} from 'redux';
import Counter from './CounterReducer';
import Api from './api'

export default combineReducers({
    api: Api,
    counter: Counter
})