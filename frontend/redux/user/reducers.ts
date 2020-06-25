const initialState={
    username:'',
    email:'',
    permissions:'',
    last_seen:'',
    account_created:'',
    token:'',
    isLogged:false
};

const reducer=(state= initialState, action:any)=>{
    if(action.type==='UPDATE_CONTENT'){
        return{
            ... state,
            username:action.username,
            email:action.email,
            permissions:action.permissions,
            last_seen:action.last_seen,
            account_created:action.account_created,
            token:action.token,
            isLogged:action.isLogged
        };
    }

    return state;
};

export default reducer;