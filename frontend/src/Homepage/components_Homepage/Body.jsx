import React from "react";
import Header from "./Body/Header";
import Middle from "./Body/Middle";
import Lower from "./Body/Lower";

function Body({ onSearchRedirect }) {
    return (
        <div className="homepage_body-0">
            <div className="homepage_body-1">
                <div className="homepage_body-2">
                    <div className="homepage_body-3">
                        <div className="homepage_body-4">
                            <div className="homepage_body-5">
                                <Header />
                                <Middle />
                                <Lower onSearchRedirect={onSearchRedirect} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
