import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
    const [currentPage,serCurrentPage]=useState(1);
    const [postperPage,setPostperPage]=useState(10)

  const getData = async () => {
    const result = await axios.get(
      "http://api.giphy.com/v1/gifs/trending?api_key=Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY"
    );
    console.log("===>", result);
    setData(result.data.data);
  };

  useEffect(() => {
    getData();
    return()=>{
console.log("return")
    }
    
  }, []);
  useEffect(() => {
    const filtered = data.filter((ele) => {
      ele.toLowerCase().includes(text.toLowerCase());
      console.log("=====>", data);
    });
    setText(filtered);
  }, []);

    const indexOfLastPost=currentPage * postperPage;
    const indexOfFirstPost=indexOfLastPost-postperPage;
    const currentPosts=data.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className="main">
      <h1>GIPHY</h1>
      <input
        type="search"
        placeholder="@username + tag to search within a verified channel "
        onChange={(e) => setText(e.target.value)}
      />
      <button>Search</button>
      <br />
      <br />
      <br />

      {data.map((item) => {
        console.log(item.images);
        return (
          <div key={item.id} className="c2">
            <h3 className="title">{item.title.slice(0, 20) + "..."}</h3>

            <img className="img" src={item.images.downsized.url} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Home;