// fetch requests

import { SignInFormData } from "./pages/SignIn";
import { RegisterFormData } from "./pages/register";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";  // '|| ""' tell th fetch request that there is no API base url so just use the same server for all the equests


export const register = async (formData: RegisterFormData) => {    /*registerformdata imported from register.tsx*/
    
    // this willl make the fetch req  for us and server response which will get stored
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {     //attachiang URL into fetch request
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type" : "application/json"   //body of formt json
        },
        body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

};

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(formData)
    })
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    }
    return body;
}

export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Token invalid")
    }
    return response.json();
};

export const signOut = async () =>{
    const response = await fetch (`${API_BASE_URL}/api/auth/logout`, {
        credentials:"include",
        method: "POST"
    }); //fetch request

    if(!response.ok) {
        throw new Error("Error during sign out");
    }
};

export const addmyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method:"POST",
        credentials:"include",
        body: hotelFormData,
    });

    if(!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
}