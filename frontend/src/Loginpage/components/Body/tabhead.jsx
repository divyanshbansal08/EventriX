import React from "react";

function Tabhead(props) {
    return (<div className="signup-tab-content-0">
        <div className="signup_text-align-center">
            <div className="signup_max-width-large">
                <div className="Login"><div className="signup_heading-style-h2">{props.title}</div></div>
                <p className="signup_text-size-medium">Your updates are waiting-sign in to see them first!</p>
            </div>
        </div>
    </div>);
}
export default Tabhead;