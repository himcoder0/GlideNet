import React from "react";
import "./Home.css";
import Topbar from "../../components/topbar/Topbar.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Feed from "../../components/feed/Feed.js";
import Rightbar from "../../components/rightbar/Rightbar.js";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
