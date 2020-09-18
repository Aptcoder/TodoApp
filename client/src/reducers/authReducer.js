const defaultAuth = {
    authToken: '',
    user: {}
}
const authReducer = (state=defaultAuth, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.user,
                authToken: action.authToken
            }
        default: 
            return state;
    }

}

export default authReducer;