import React from "react";
import Tabs from "./Body/tabs";
import Tabscontent_changepassword from "./Body/Tabscontent_changepassword";

function Body_changepassword() {
    return (<div className="signup_align-center">
        <div className="signup_tabs">
            <Tabscontent_changepassword />
        </div>
    </div>);
}
export default Body_changepassword;