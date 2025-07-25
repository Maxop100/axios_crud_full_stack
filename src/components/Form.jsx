import { useEffect, useState } from "react";
import { PostData, updateData } from "../API/postApi";

export const Form = ({ data, setData, setUpdateDataApi, updateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (updateDataApi) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);

  let isEmpty = Object.keys(updateDataApi).length === 0;

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await PostData(addData);
    console.log("res", res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    const res = await updateData(updateDataApi.id, addData);
    console.log(res);
    if (res.status === 200) {
      const updated = data.map((post) =>
        post.id === updateDataApi.id ? res.data : post
      );
      setData(updated);
      setAddData({ title: "", body: "" });
      setUpdateDataApi({});
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD") {
      addPostData();
    } else if (action === "EDIT") {
      updatePostData();
    }
  };

  return (
    <>
      <form className="flex p-6" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            className="bg-white p-4 m-6"
            type="text"
            onChange={handleInputChange}
            value={addData.title}
            autoComplete="off"
            id="title"
            name="title"
            placeholder="add-title"
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <input
            className="bg-white p-4 m-6"
            value={addData.body}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
            id="body"
            name="body"
            placeholder="add-post"
          />
        </div>

        <button
          className="bg-amber-400 p-6 hover:rounded-2xl w-40 transition-transform duration-100"
          type="submit"
          value={isEmpty ? "ADD" : "EDIT"}
        >
          {isEmpty ? "ADD" : "EDIT"}
        </button>
      </form>
    </>
  );
};
