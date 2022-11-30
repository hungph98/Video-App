import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import "../App.css";


const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <div className="container">
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </div>
  );
};

export default Home;