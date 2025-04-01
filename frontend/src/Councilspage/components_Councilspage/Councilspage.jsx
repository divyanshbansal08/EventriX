import React from "react";
import Header_councilspage from "./Header_councilspage";
import Body_councilspage from "./Body_councilspage";
import Logo_main from "../../Homepage/components_Homepage/Logo_main";

function Councilspage() {
    return (
        <div className="councilspage_maindiv-0">
            <div className="councilspage_maindiv-1">
                <div className="councilspage_maindiv-2">
                    <div className="councilspage_maindiv-3">
                        <Header_councilspage />
                        <Body_councilspage />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Councilspage;