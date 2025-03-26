import React from "react";
import { Link } from "react-router-dom";
import "../styles_Councilspage/index.css";
import councils from "../components_Councilspage/councils.js"

const CouncilList = () => {
  return (
    <div className="council-section">
      <h1>Councils</h1>
      {councils.map((council, index) => (
        <div className="council" key={index}>
          <div className="council-desc">
            <h2 className="council-name">{council.name}</h2>
            <h2 className="council-keyword">{council.keyword}</h2>
            <p className="council-text">{council.description}</p>
            <Link to={`/councils/clubs/${council.tag}`}><button className="council-btn">Explore Clubs</button></Link>
            <Link to={`/councils/${council.id}`}><button className="council-btn">See More &gt;</button></Link>
          </div>
          <img src={council.imgSrc} alt={`${council.name} Logo`} />
        </div>
      ))}
    </div>
  );
};

export default CouncilList;
