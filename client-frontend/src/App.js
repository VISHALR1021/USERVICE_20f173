import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "../src/pages/SignUp";
import Login from "../src/pages/Login";
import Search from "../src/pages/Search";
import ProjectOverView from "../src/pages/ProjectOverview";
import PostProject from "../src/pages/PostProject";
import PaymentPage from "../src/pages/PaymentPage";
import NewProject from "../src/pages/NewProject";
import Explore from "../src/pages/Explore";
import MyProjects from "../src/pages/MyProjects";
import Home from "../src/pages/Home";
import EditProject from "../src/pages/EditProject";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "../src/components/Nav/Navbar";
import UserContext from "./context/userContext";
import constants from "./constants/constants";
import Axios from "axios";
import Profile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import Example from "./pages/Example";
import MyProjectOverview from "./pages/MyProjectOverview";
import ProfileView from "./pages/ProfileView";
import AppliedProjects from "./pages/AppliedProjects";
import Chat from "./pages/Chat-Page/Chat/Chat";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        constants.backend_url + "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(constants.backend_url + "/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/explore" component={Explore} />
        <Route path="/search/:keyword" component={Search} />
        <Route path="/project-overview/:id" component={ProjectOverView} />
        <Route path="/my-project-overview/:id" component={MyProjectOverview} />
        <Route path="/post-project" component={PostProject} />
        <Route path="/payment-page" component={PaymentPage} />
        <Route path="/new-project" component={NewProject} />
        <Route path="/my-projects" component={MyProjects} />
        <Route path="/edit-project/:id" component={EditProject} />
        <Route path="/chat" component={Chat} />
        <Route path="/my-profile" component={Profile} />
        <Route path="/example" component={Example} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/applied-projects" component={AppliedProjects} />
        <Route path="/profile-view/:id/:type" component={ProfileView} />
      </UserContext.Provider>
    </Router>
  );
};

//paypal sanbox payer -> email: sb-o4q3o6302059@personal.example.com , pass: 1VD"Y!tL

//paypal sandbox reciever -> email: sb-2b1kh6293544@business.example.com , pass: 7d'j/H6-

export default App;
