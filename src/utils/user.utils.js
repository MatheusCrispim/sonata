//import { Service } from "../services/service";

/**
 * implement its logic to manipulate the user's token, by 
 * default it is stored in the localstorage of the browser, 
 * so the implementations implemented by default are web-oriented.
 **/

// const { get } = new Service();

//Checks if user is Authenticated
// export async function isAuthenticated(){
//     let response = await get('/users/profile');
//     if(response.status === 200){
//         return true;
//     }
//     return false;
// }

//Delete the token
export function unsetToken(){
    //Implement your logic to delete the token here
    //window.localStorage.removeItem('token');
}

//Sets the token
export function setToken(token){
    //Implement your logic to set the token here
   // window.localStorage.setItem('token', token);
}

//Gets the token
export function getToken(){
    //Implement your logic to gets the token here
    return "";//window.localStorage.getItem('token');    
}