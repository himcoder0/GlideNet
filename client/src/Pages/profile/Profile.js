import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Feed from "../../components/feed/Feed.js";
import Rightbar from "../../components/rightbar/Rightbar.js";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">top</div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
