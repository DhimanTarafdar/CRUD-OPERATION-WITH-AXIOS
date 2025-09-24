import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";
import "../App.css";

export const Posts = () => {

  // State to store posts data
  const [data, setData] = useState([]);
  const [updateDataApi,setUpdateDataApi]=useState({});

  //console.log(getPost());
  // Fetches posts data asynchronously from the API and logs the response
  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
    console.log(res.data);
  }
  // Fetch posts data once when the component mounts
  useEffect(() => {
    getPostData();
  }, []);


  //function to delete post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        })
        setData(newUpdatedPosts);
      }


    } catch (error) {
      console.log(error);

    }

  }

  //handleUpdatePost
  const handleUpdatePost=(curElem)=>setUpdateDataApi(curElem);


  return (
    <>
      <section>
        <Form 
        data={data} 
        setData={setData} 
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi} />
      </section>

      <section>

        <ol className="space-y-4">
          {data.map((curElem) => {
            // object destructuring
            const { id, body, title } = curElem;
            // Provide a unique key for React list rendering
            return (
              <li
                key={id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 flex flex-col gap-2"
              >
                <p className="text-sm text-gray-500">Id: {id}</p>
                <p className="text-lg font-semibold text-blue-700">Title: {title}</p>
                <p className="text-gray-700">{body}</p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={()=>handleUpdatePost(curElem)}>
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

      </section>

    </>
  )
}