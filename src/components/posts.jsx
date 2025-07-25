// src/components/Posts.jsx
import { useEffect, useState } from "react";
import { DeletePost, getPosts } from "../API/postApi";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi,setUpdateDataApi]=useState({});

  const getPostData = async () => {
    try {
      const response = await getPosts();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const response = await DeletePost(id);
      if (response.status === 200 || response.status === 204) {
        const newUpdated = data.filter((curPost) => curPost.id !== id);
        setData(newUpdated);
      } else {
        console.error("Failed to delete post. Status:", response.status);
      }
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  const handleUpdatePost =(curElem)=>setUpdateDataApi(curElem);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <section className="p-3 bg-[#212f3d] m-8">
        <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
      </section>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Posts</h1>
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((curElem) => {
          const { id, body, title } = curElem;
          return (
            <li
              key={id}
              className="bg-white rounded-2xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300"
            >
              <span>{id}.</span>
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <p className="text-gray-600">{body}</p>
              <div className="flex gap-4 mt-4">
                <button onClick={()=>{handleUpdatePost(curElem)}} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
