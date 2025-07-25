import { useEffect, useState } from "react"
import { PostData } from "../API/postApi";

export const Form =({data,setData,setUpdateDataApi,updateDataApi})=>{
    const [addData,setAddData]=useState({
        title:"",
        body:""

    });

    useEffect(()=>{
        updateDataApi&&setAddData({
            title:updateDataApi.title || "",
            body:updateDataApi.body || "",
        })
    },[updateDataApi])

    const handleInputChange =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev)=>{return{ 
            ...prev,[name]:value,
        }})
    }

    const addPostData=async()=>{
      const res = await  PostData(addData);
      console.log("res",res);
      if(res.status===201){
        setData([...data,res.data]);
        setAddData({title:"",body:""});

      }

    }

    const handleFormSubmit =(e)=>{
        e.preventDefault();
        addPostData();
    }



    return (
        <>
        <form className="flex  p-6" onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input className="bg-white p-4 m-6" type='text' onChange={handleInputChange} value={addData.title} autoComplete="off" id="title" name="title" placeholder="add-title"/>
            </div>
            <div>
                <label htmlFor="body"></label>
                <input className="bg-white p-4 m-6" value={addData.body} onChange={handleInputChange} type='text' autoComplete="off" id="body" name="body" placeholder="add-post"/>
            </div>
            
            <button className="bg-amber-400 p-6 hover:rounded-2xl h w-2xl justify-center align-middle items-center transition-transform duration-100" type="submit">ADD</button>
        </form>
        </>
    )
}