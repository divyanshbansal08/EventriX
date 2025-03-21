import React from "react";
import { useNavigate } from "react-router-dom";


function Tiles(props) {
    const navigate = useNavigate();

    return (<a onClick={() => navigate(props.navigate)} style={{ cursor: "pointer", color: "white", textDecoration: "none" }} className="homepage_tiles">
        {props.content}
    </a>);
}
export default Tiles;