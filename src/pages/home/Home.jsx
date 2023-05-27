import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import PendingJobs from "../pendingJobs/PendingJobs";
import AcceptedJobs from "../acceptedJobs/AcceptedJobs";
import Rejectedjobs from "../rejectedJobs/RejectedJobs";
import HistoryActions from "../history/historyActions";
import Dashboard from "../dashboard/Dashboard";
import JobDetails from "../jobDetails/JobDetails";
import { Switch, Route } from "react-router-dom";
import NavBarProfile from "../../components/NavBarProfile";
import axios from "../../common/Axios";
import { userDef } from "./types/user";

function Home({ userCode, setIsLoggedIn, setUserCode }) {
  const FETCH_USER_BY_ID = "/user/fetch/ID";
  const FETCH_PENDING_JOBS = "/inspection/fetch";
  const FETCH_ACTIONS_HISTORY = "/actionhistory";
  const [pendingJobs, setPendingJobs] = useState([]);
  const [user, setUser] = useState(userDef);
  const [actionHistory, setActionHistory] = useState([]);
  const [pendingInspections, setPendingInspections] = useState([]);
  const [acceptedInspections, setAcceptedInspections] = useState([]);
  const [rejectedInspections, setRejectedInspections] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchInspectionPendingJobs();
    fetchActionsHistory();
  }, []);

  const fetchUserData = async () => {
    const response = await axios.post(
      FETCH_USER_BY_ID,
      {
        UserCode: userCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userData = {
      Email: response["data"].Email,
      FirstName: response["data"].FirstName,
      IsActive: true,
      IsDeleted: false,
      LastName: response["data"].LastName,
      PhoneNo: response["data"].PhoneNo,
      ProfileImage: "",
      UserCode: response["data"].UserCode,
      UserName: response["data"].UserName,
      UserType: response["data"].UserType,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const fetchInspectionPendingJobs = async () => {
    const response = await axios.get(
      FETCH_PENDING_JOBS,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setPendingJobs(response.data);
    setPendingInspections(filterPendingInspections(response.data));
    setAcceptedInspections(filterAccpetedInspections(response.data));
    setRejectedInspections(filterRejectedInspections(response.data));
  };

  const fetchActionsHistory = async () => {
    const response = await axios.get(
      FETCH_ACTIONS_HISTORY,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setActionHistory(response.data);
  };

  const filterPendingInspections = (data) => {
    return data.filter((item) => item.Status === "pending");
  };
  const filterAccpetedInspections = (data) => {
    return data.filter((item) => item.Status === "approved");
  };
  const filterRejectedInspections = (data) => {
    return data.filter((item) => item.Status === "rejected");
  };

  return (
    <div className="Home">
      <SideBar />
      <div className="homeContainer">
        <div className="navBar">
          <NavBarProfile
            setIsLoggedIn={setIsLoggedIn}
            setUserCode={setUserCode}
          />
        </div>
        <Switch>
          <Route path="/pending">
            <PendingJobs pendingJobs={pendingInspections} />
          </Route>
          <Route path="/accepted">
            <AcceptedJobs approvedJobs={acceptedInspections} />
          </Route>
          <Route path="/rejected">
            <Rejectedjobs rejectedJobs={rejectedInspections} />
          </Route>
          <Route path="/jobdetails" component={JobDetails} />
          <Route path="/history">
            <HistoryActions actionHistory={actionHistory} />
          </Route>
          <Route path="/">
            <Dashboard
              summaryData={{
                rejected: rejectedInspections.length,
                accepted: acceptedInspections.length,
                pending: pendingInspections.length,
              }}
            />
          </Route>
          <Route>
            <PendingJobs pendingJobs={pendingInspections} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
