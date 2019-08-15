import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Landing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
