const user: any = localStorage.getItem('user');

export const initialState = {
    user: JSON.parse(user),
    isToken: localStorage.getItem('token')
};

export const reducer = (state: any, action: any) => {
    switch(action.type) {
        case 'success':
            return { ...state, isToken: action.value };
        case 'failure':
            return { ...state, isToken: action.value };
        case 'user':
            return { ...state, user: action.value };
        default:
            return state;
    }
};
