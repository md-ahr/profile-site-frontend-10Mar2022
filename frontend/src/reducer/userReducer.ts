const user: any = localStorage.getItem('user');

export const initialState = {
    user: JSON.parse(user),
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token')
};

export const reducer = (state: any, action: any) => {
    switch(action.type) {
        case 'success':
            return { ...state, user: action.value.user, token: action.value.token, id: action.value.id };
        case 'failure':
            return { ...state, user: action.value.user, token: action.value.token, id: action.value.id };
        default:
            return state;
    }
};
