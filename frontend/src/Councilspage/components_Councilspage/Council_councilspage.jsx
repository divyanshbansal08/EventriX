import React from "react";
import Tags_council from "./Tags_council";

function Council_councilspage(props) {
    return (
        <div className="councilspage_council-0">
            <div className="councilspage_council-0-left">
                <div className="councilspage_council_title-wrapper">
                    <h3>
                        {props.heading}
                    </h3>
                    <div className="councilspage_council_tag-wrapper-0">
                        <div className="councilspage_council_tag-wrapper-1">
                            <Tags_council val={props.tag1} />
                            <Tags_council val={props.tag2} />
                            <Tags_council val={props.tag3} />
                        </div>
                    </div>
                </div>
                <div className="councilspage_council_info">
                    <p className="councilspage_council_info_text-size">
                        {props.content}
                    </p>
                </div>
                <div className="councilspage_council_button-wrapper-0">
                    <div className="councilspage_council_button-wrapper-1">
                        <a className="councilspage_council_button-0 councilspage_council_button-1 councilspage_hover-button">Explore Clubs</a>
                        <a className="councilspage_council_button2-0 councilspage_council_button2-1 councilspage_council_button2-2 councilspage_hover-button">
                            <div>See More</div>
                            <div className="councilspage_council_button2-4"><img src="../Assests_Councilspage/next.png" /></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Council_councilspage;