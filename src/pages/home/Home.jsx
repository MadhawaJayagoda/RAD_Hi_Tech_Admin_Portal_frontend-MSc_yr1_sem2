import React from "react";
import SideBar from "../../components/SideBar";
import PendingJobs from "../pendingJobs/PendingJobs";
import AcceptedJobs from "../acceptedJobs/AcceptedJobs";
import Rejectedjobs from "../rejectedJobs/RejectedJobs";
import JobDetails from "../jobDetails/JobDetails";
import { Switch, Route } from "react-router-dom";
import NavBarProfile from "../../components/NavBarProfile";

function Home() {
  return (
    <div className="Home">
      <SideBar />

      <div className="homeContainer">
        <div className="navBar">
          <NavBarProfile />
        </div>
        <Switch>
          <Route path="/pending" exact component={PendingJobs} />
          <Route path="/accepted" component={AcceptedJobs} />
          <Route path="/rejected" component={Rejectedjobs} />
          <Route path="/jobdetails" component={JobDetails} />
          <Route path="/" component={PendingJobs}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
