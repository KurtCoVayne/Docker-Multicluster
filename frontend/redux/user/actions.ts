/* export const getContent=()=>{
    return{
        type:'GET_CONTENT'
    };
}; */

export const updateContent=(e:any)=>{
    return{
        type:'UPDATE_CONTENT',
        username:e.username,
        email:e.email,
        permissions:e.permissions,
        last_seen:e.last_seen,
        account_created:e.account_created,
        token:e.token,
        isLogged:e.isLogged
    };
}