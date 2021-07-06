import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

//hydrate - server-rendered markup is preserved and only event handlers are attached
//when react takes over the browser
hydrate(<App />, document.getElementById("root"));
