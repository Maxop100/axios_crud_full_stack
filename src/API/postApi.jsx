import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

//get

export const getPosts = async () => {
    return await api.get("/posts");
};