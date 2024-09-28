export const getUserRole=()=>{
    return localStorage.getItem("_role_");
}

export const setUserRole=(role)=>{
    return localStorage.setItem("_role_",role);
}

export const getUsername=()=>{
    return localStorage.getItem("_username_");
}

export const setUsername=(username)=>{
    return localStorage.setItem("_username_",username);
}