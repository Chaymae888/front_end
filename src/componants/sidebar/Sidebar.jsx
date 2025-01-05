import React, { useState } from 'react';
import "./sidebar.css";
import Image from "../../assets/logoC.png";

const Sidebar = () => {
  const [toggle,showMenu]=useState(false);
  return (
    <>
      <aside className={toggle? "aside show-menu" : "aside"}>
        <a href='#home' className="nav_logo">
          <img src={Image} alt="" className="logo"/>
        </a>
        <nav className="nav">
          <div className="nav_menu">
            <u1 className="nav_list">
              <li className="nav_item">
                <a href="#home" className="nav_link">
                  <i className="icon-home" ></i>
                </a>
              </li>
              <li className="nav_item">
                <a href="#about" className="nav_link">
                  <i className="fa-solid fa-user" ></i>
                </a>
              </li>
              {/* <li className="nav_item">
                <a href="#services" className="nav_link">
                  <i className="fa-solid fa-briefcase" ></i>
                </a>
              </li> */}
              <li className="nav_item">
                <a href="#resume" className="nav_link">
                  <i className="icon-graduation"></i>
                </a>
              </li>
              <li className="nav_item">
                <a href="#portfolio" className="nav_link">
                  <i className="icon-layers"></i>
                </a>
              </li>
              {/* <li className="nav_item">
                <a href="#blog" className="nav_link">
                  <i className="icon-note"></i>
                </a>
              </li> */}
              <li className="nav_item">
                <a href="#contact" className="nav_link">
                  <i className="icon-bubble"></i>
                </a>
              </li>
            </u1>
          </div>
        </nav>
        <div className="nav_footer">
          <span className="copyright">&copy; 2024-2025.</span>
        </div>
      </aside>

      <div className={toggle ? "nav_toggle nav_toggle-open":"nav_toggle"} onClick={()=> showMenu(!toggle)}>
        <i className="icon-menu"></i>
      </div>
    </>
  )
}

export default Sidebar
