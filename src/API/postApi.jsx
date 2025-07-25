import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

//get

export const getPosts = async () => {
    return await api.get("/posts");
};

//delete
export const DeletePost = (id)=>{
  return api.delete(`/posts/${id}`);

}


//post
export const PostData=(post)=>{
  return api.post("/posts",post);
}