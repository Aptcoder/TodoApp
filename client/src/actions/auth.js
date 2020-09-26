import axios from 'axios';
export const loginUser = (user,authToken) => {
    localStorage.setItem('token', authToken);
    return {
        type: 'LOGIN_USER',
        user,
        authToken
    }
}

export const startLogin = (userDetails) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/users/auth',{
                email: userDetails.email,
                password: userDetails.password
            })
            .then((response) => {
                const { user } = response.data.data;
                const authToken = response.headers['x-auth'];
                dispatch(loginUser(user,authToken));
                return resolve(response.data.message)
            })
            .catch((error)=> {
                if(error.response){
                    return reject(error.response.data.message);
                }
                else {
                    return reject('Something unexpected went wrong');
                }
            })
        })
    }
}

export const startRegister = (userDetails) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/users/',{
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            })
            .then((response) => {
                const { user } = response.data.data;
                const authToken = response.headers['x-auth'];
                dispatch(loginUser(user,authToken));
                resolve(response.data.message)
            })
            .catch((error)=> {
                if(error.response){
                    if(error.response.status === 400){
                      reject('Email address already registered. Please Login');
                    }
                    else {

                        reject(error.response.data.message);
                    }
                }
                else {
                    reject('Something unexpected went wrong');
                }
            })
        })
    }
}

export const getUserProfile = (authToken) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/users/profile',{
                headers: { 'x-auth': authToken}
            })
            .then((response) => {
    
                const { user } = response.data.data;
                dispatch(loginUser(user,authToken));
                resolve()
            })
            .catch((error)=> {
               // Do nothing if request not successfull but reject promise
               reject(error)
            })
        })
       
    }
}