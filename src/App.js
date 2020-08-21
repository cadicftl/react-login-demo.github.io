import React from "react";
import NotFound from "./components/NotFound";
import Login from "./features/Login";
import Register from "./features/Register";
import Dashboard from "./features/Dashboard";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
