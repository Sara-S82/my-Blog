import React from 'react';
import axios from 'axios';

const API_BASE_URL = "https://blog.ahmadreza.dev/api";

export const makeRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {

        ...(token && { Authorization: `Bearer ${token}` }),
      },
      data,
        withCredentials:false
    };
    if(data instanceof FormData){
      delete config.headers["Content-Type"]
    }
    else{
       config.headers["Content-Type"]="application/json"
    }
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
