import React from "react";
import Council_councilspage from "./Council_councilspage";

function Body_councilspage() {
    return (
        <div className="councilspage_body-0">
            <Council_councilspage
                heading="Media and Culture Council"
                tag1="#MnC"
                tag2="#cultureiitk"
                tag3="#iitk"
                content="The Media and Culture Council at IIT Kanpur encourages creativity, expression, and cultural awareness. It organizes diverse events, including workshops, performances, and competitions, providing students with opportunities to explore arts, media, and cultural traditions."
            />
            <Council_councilspage
                heading="Science and Technology Council"
                tag1="#SnT"
                tag2="#techiitk"
                tag3="#iitk"
                content="The Science and Technology Council at IIT Kanpur promotes innovation, technical skills, and research. It organizes workshops, competitions, and projects, providing students with opportunities to explore emerging technologies and excel in scientific advancements."
            />
            <Council_councilspage
                heading="Games and Sports Council"
                tag1="#GnS"
                tag2="#sportsiitk"
                tag3="#iitk"
                content="The Games and Sports Council at IIT Kanpur promotes physical fitness, teamwork, and sportsmanship. It organizes tournaments, training sessions, and events, encouraging students to excel in sports and maintain a healthy, active lifestyle."
            />
            <Council_councilspage
                heading="Academics and Carrer Council"
                tag1="#AnC"
                tag2="#acadsiitk"
                tag3="#iitk"
                content="The Academics and Career Council at IIT Kanpur supports academic excellence and professional growth. It organizes workshops, guidance sessions, and career opportunities, helping students develop skills, explore career paths, and achieve academic success."
            />
        </div>
    );
};

export default Body_councilspage;