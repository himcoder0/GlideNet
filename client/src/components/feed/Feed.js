import React, { useEffect, useState } from "react";
import "./Feed.css";
import Share from "../share/Share.js";
import Post from "../post/Post.js";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get("/posts/timeline/66a117697d3e2f5951c89cea");
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <Share />
      {posts.map((p) => {
        return <Post key={p._id} post={p} />;
      })}
    </div>
  );
}
