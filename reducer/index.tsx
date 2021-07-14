import {combineReducers} from 'redux';
import Counter from './CounterReducer';

export default combineReducers({
    counter: Counter
})