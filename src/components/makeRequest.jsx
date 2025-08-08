import React from 'react';
import axios from 'axios';
const API_BASE_URL ="https://blog.ahmadreza.dev/api"
export const makeRequest= async(endpoint,method='GET',data=null,token=null)=>{

    try{
        const config={
            method,
            url:`${API_BASE_URL}${endpoint}`,headers:{
                "Content-Type":"application/json",
                ...API_BASE_URL(token&&{Authorization:`Bearer ${token}`}),
            },
            data,
        };
        const response = await axios(config);
        return response.data;
    }catch(error){
        throw error
    }


};
