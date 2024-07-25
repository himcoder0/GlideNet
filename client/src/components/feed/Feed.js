import React from "react";
import "./Feed.css";
import Share from "../share/Share.js";
import Post from "../post/Post.js";
import { Posts } from "../../dummyData.js";

export default function Feed() {
  return (
    <div className="feed">
      <Share />
      {Posts.map((p) => {
        return <Post key={p.id} post={p} />;
      })}
    </div>
  );
}
