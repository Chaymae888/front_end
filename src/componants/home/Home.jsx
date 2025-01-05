import React from 'react';
import "./home.css";
import Me from "../../assets/logoC.png";
import HeaderSocials from "./HeaderSocials";
import ScrollDown from './ScrollDown';
import Shapes from './Shapes';

const Home = () => {
  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={Me} alt="" className="home_img" />
        <h1 className="home_name">
          Chaymae Bouti
        </h1>
        <span className="home_education">I'm a software engineer</span>

        <HeaderSocials/>

        <a href="#contact" className="btn">Hire Me</a>

        <ScrollDown/>
      </div>

      <Shapes/>
    </section>
  );
} 

export default Home