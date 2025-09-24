import { useEffect, useState } from "react"
import { postData, updateData } from "../api/PostApi";


export const Form = ({ data, setData,updateDataApi,setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  })

  let isEmpty= Object.keys(updateDataApi).length ===0;

  useEffect(()=>{
      updateDataApi && setAddData(
        {
           title: updateDataApi.title || "",
           body: updateDataApi.body || "",
        }
      )
  },[updateDataApi])

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log(res);
    if (res.status == 201) {
      const newPost = { ...res.data, id: data.length + 1 };
      setData([...data, newPost]);
      setAddData({title:"",body:""});
    }
   
  }

  //updatePostData

  const updatePostData =async ()=>{
    try {
       const res=await updateData(updateDataApi.id,addData);
       console.log(res);

       setData((prev)=>{
        // console.log(prev);
        return prev.map((curElem)=>{
          return curElem.id===res.data.id?res.data:curElem;
        })
       })
        setAddData({title:"",body:""});
        setUpdateDataApi({})
    } catch (error) {
      console.log(error);
      
    }
   
  }

  //form submision
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (addData.title.trim() === "" || addData.body.trim() === "") {
      alert("Please fill both Title and Body!");
      return; // function এখানেই stop হবে
    }
    const action = e.nativeEvent.submitter.value;
    if(action==="Add"){
    addPostData();
    }else if(action === "Edit")
    {
      updatePostData();
    }
  }
  return (
    <form className="flex justify-center"
      onSubmit={handleFormSubmit}>
      <div className="">
        <label htmlFor="title"></label>
        <input type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
          className="border-2 border-blue-500 p-4 m-4 rounded-2xl bg-blue-400" />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add body"
          value={addData.body}
          onChange={handleInputChange}
          className="border-2 border-blue-500 p-4 m-4 rounded-2xl bg-blue-400" />
      </div>
      <button className="border-2 border-blue-500 p-4 m-4 rounded-2xl bg-blue-400"
      value={isEmpty?"Add":"Edit"}
      >{isEmpty?"Add":"Edit"}
      </button>
    </form>
  )
}