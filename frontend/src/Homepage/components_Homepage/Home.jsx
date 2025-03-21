import React from "react";
import Body from "./Body";
import Logo_main from "./Logo_main";
import SpiderManImage from "../Assets_Homepage/marvels-spider-man--11990.jpeg";

function Home() {
    return (
        <div className="homepage_main-div-0">
            <div
                className="background-image-main"
                style={{
                    backgroundImage: `url(${SpiderManImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    position: 'fixed',  // Makes sure it covers the whole screen
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1  // Sends it to the background
                }}
            />

            <Logo_main />
            <Body />
        </div>
    );
}

export default Home;
