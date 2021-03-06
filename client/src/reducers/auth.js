import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, autoData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, autoData: null };

        default:
            return state;
    }
}

export default authReducer