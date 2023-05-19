import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import PendingJobs from "../pendingJobs/PendingJobs";
import AcceptedJobs from "../acceptedJobs/AcceptedJobs";
import Rejectedjobs from "../rejectedJobs/RejectedJobs";
import JobDetails from "../jobDetails/JobDetails";
import { Switch, Route } from "react-router-dom";
import NavBarProfile from "../../components/NavBarProfile";
import axios from "../../common/Axios";
import { userDef } from "./types/user";

function Home({ userCode, setIsLoggedIn, setUserCode }) {
  const FETCH_USER_BY_ID = "/user/fetch/ID";
  const FETCH_PENDING_JOBS = "/inspection/fetch";
  const [user, setUser] = useState(userDef);
  const [pendingInspections, setPendingInspections] = useState([]);
  const [acceptedInspections, setAcceptedInspections] = useState([]);
  const [rejectedInspections, setRejectedInspections] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchInspectionPendingJobs();
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
      Email: response.data["Result"]?.Email,
      FirstName: response.data["Result"]?.FirstName,
      IsActive: true,
      IsDeleted: false,
      LastName: response.data["Result"]?.LastName,
      PhoneNo: response.data["Result"]?.PhoneNo,
      ProfileImage: "",
      UserCode: response.data["Result"]?.UserCode,
      UserName: response.data["Result"]?.UserName,
      UserType: response.data["Result"]?.UserType,
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
    setPendingInspections(filterPendingInspections(response?.data));
    setAcceptedInspections(filterAccpetedInspections(response?.data));
    setRejectedInspections(filterRejectedInspections(response?.data));
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
          <Route path="/pending" exact>
            <PendingJobs />
          </Route>
          <Route path="/accepted">
            <AcceptedJobs approvedJobs={acceptedInspections} />
          </Route>
          <Route path="/rejected">
            <Rejectedjobs rejectedJobs={rejectedInspections} />
          </Route>
          <Route path="/jobdetails" component={JobDetails} />
          <Route path="/">
            <PendingJobs pendingJobs={pendingInspections} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
