export const getToken  = ()=>{
    if(typeof window !== "undefined"){
        const token = localStorage.getItem("token");
        return token ? token : null;
    }
    return null;
}