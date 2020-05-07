import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./component/App";
import Success from "./component/Success";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/success" component={Success} />
    </Switch>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Routes />, rootElement);