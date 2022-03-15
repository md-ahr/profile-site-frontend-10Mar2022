const user: any = localStorage.getItem('user');
const experiences: any = localStorage.getItem('experiences');

export const initialState = {
    token: localStorage.getItem('token'),
    user: JSON.parse(user),
    experiences: JSON.parse(experiences)
};

export const reducer = (state: any, action: any) => {
    switch(action.type) {
        case 'success':
            return { ...state, token: action.value.token, user: action.value.user };
        case 'failure':
            return { ...state, token: action.value.token, user: action.value.user };
        case 'experience':
            return { ...state, experiences: action.value };
        default:
            return state;
    }
};
