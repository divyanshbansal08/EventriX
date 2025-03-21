import React from "react";
import Tiles from "./Tiles";

function Left_Logo() {

    return (<nav role="navigation" className="homepage_left-logo-div-0">
        <Tiles content="Events" navigate="/councils" />
        <Tiles content="Home" navigate="/home" />
        <Tiles content="Councils" navigate="/councils" />
        <Tiles content="Cells" navigate="/councils" />
        <Tiles content="Fests" navigate="/councils" />
    </nav>);
}
export default Left_Logo;