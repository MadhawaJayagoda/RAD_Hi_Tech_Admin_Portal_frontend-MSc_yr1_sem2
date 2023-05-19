import React from "react";
import ActionAreaCard from "./imageCard";
import { SideBarData } from "./SideBarData";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="listLogo">
        <ActionAreaCard imgHeight={50} />
      </div>
      <ul className="sidebarList">
        {SideBarData.map((val, key) => {
          return (
            <Link to={val.link} style={{ textDecoration: "none" }} key={key}>
              <li key={key} className="listRow">
                <div className="listIcon">{val.icon}</div>
                <div className="listTitle">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
