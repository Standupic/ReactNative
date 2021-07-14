interface IInitialState {
    counter: number
}

const INITIAL_STATE: IInitialState = {
    counter: 0
}

type ACTIONTYPE = 
    | { type: "INCREMENT" }
    
const Counter = (state = 0, action: ACTIONTYPE) => {
    switch (action.type){
        case 'INCREMENT':
            return state += 1
        default:
            return state
    }
}

export default Counter