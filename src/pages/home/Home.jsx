import React from "react";
import SideBar from "../../components/SideBar";
import SampleOne from "../sample1/SampleOne";
import SampleTwo from "../sample2/SampleTwo";
import { Switch, Route } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <SideBar />
      <div className="homeContainer">
        <Switch>
          <Route path="/first" exact component={SampleOne} />
          <Route path="/second" component={SampleTwo} />
          <Route path="/" component={SampleOne}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
