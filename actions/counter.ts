import {AnyAction} from "redux";

interface IncrementAction extends AnyAction {
    type: string
}

export const increment: () => IncrementAction = () => (
    {
        type: 'INCREMENT'
    }
)