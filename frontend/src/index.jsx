import React from "react";
import ReactDOM from "react-dom";
import App from "./Loginpage/components/App";
import { BrowserRouter } from "react-router-dom";

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);


