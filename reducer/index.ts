import {combineReducers} from 'redux';
import auth from './auth'
import user from  './user'
import net from  './net'

export default combineReducers({
    auth: auth,
    user: user,
    net: net
})