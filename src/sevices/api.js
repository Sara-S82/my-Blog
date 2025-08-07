import axios from "axios";
const API_BASE_URL = 'https://blog.ahmadreza.dev/api';

export const login = (data) => axios.post(`${API_BASE_URL}/login`, data);
export const getBlogs = () => axios.get(`${API_BASE_URL}/blogs`);
export const getBlogById = (id) => axios.get(`${API_BASE_URL}/blogs/${id}`);