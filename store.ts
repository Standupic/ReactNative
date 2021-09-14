import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import reducers from './reducer';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch