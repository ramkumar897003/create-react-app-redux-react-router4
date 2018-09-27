import types from '../types';
import { getUser, saveUser } from '../utils';

let initialState = {
    fetching: false,
    user: {}
}

const user = getUser();

if(user) {
    initialState = {
        ...initialState,
        user
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.AUTH_LOGIN:
            return { ...state, fetching: true };
        case types.AUTH_SUCCESS:
            let newUser = {...action.payload};
            saveUser(newUser);
            return { ...state, fetching: false, user: newUser };
        case types.AUTH_FAILED:
            return { ...state, fetching: false };
        default: 
            return state;
    }
}
