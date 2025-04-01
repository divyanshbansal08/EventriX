import React from "react";
import Tiles from "./Tiles";

function Left_Logo() {

    return (<nav role="navigation" className="homepage_left-logo-div-0">
        <Tiles content="Home" navigate="/home" />
        <Tiles content="Events" navigate="/events" />
        <Tiles content="Councils" navigate="/councils" />
        <Tiles content="Cells" navigate="/cells" />
        <Tiles content="Fests" navigate="/fests" />
    </nav>);
}
export default Left_Logo;