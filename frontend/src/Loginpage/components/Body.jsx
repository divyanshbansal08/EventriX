import React from "react";
import Tabs from "./Body/tabs";
import Tabscontent from "./Body/tabcontent";

function Body() {
    return (<div className="signup_align-center">
        <div className="signup_tabs">
            <Tabs />
            <Tabscontent />
        </div>
    </div>);
}
export default Body;