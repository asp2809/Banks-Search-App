import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 5000
});

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
