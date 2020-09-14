const defaultAuth = {
    authToken: ''
}
const authReducer = (state=defaultAuth, action) => {
    switch(action.type){
        case 'LOGIN_AUTH':
            return {
                authToken: action.authToken
            }
        default: 
            return state;
    }

}

export default authReducer;