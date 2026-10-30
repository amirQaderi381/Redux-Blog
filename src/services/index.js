import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const getAllUsers = () => {
    return axios.get(`${SERVER_URL}/users`);
}

export const getUser = userId => {
    return axios.get(`${SERVER_URL}/users/${userId}`);
}

export const getAllBlogs = () => {
    return axios.get(`${SERVER_URL}/blogs`);
}

export const getBLog = blogId => {
    return axios.get(`${SERVER_URL}/blogs/${blogId}`);
}

export const createBlog = blog => {
    return axios.post(`${SERVER_URL}/blogs` , blog);
}

export const updateBlog = (blogId , blog) => {
    return axios.put(`${SERVER_URL}/blogs/${blogId}` , blog);
}

export const deleteBlog = blogId => {
    return axios.delete(`${SERVER_URL}/blogs/${blogId}`);
}