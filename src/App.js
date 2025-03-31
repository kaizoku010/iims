import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import FaceRecog from "./media/face_recog.svg";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import AIChat from './screens/AIChat';
import Data from "./TestDataPoint/Intel.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={(
            <React.Fragment>
              <SideNav>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <i className="fa fa-fw fa-chart-line" style={{ fontSize: "1.75em" }} />
                    </NavIcon>
                    <NavText>Dashboard</NavText>
                  </NavItem>
                  <NavItem eventKey="add-intel">
                    <NavIcon>
                      <i className="fa fa-fw fa-file-circle-plus" style={{ fontSize: "1.75em" }} />
                    </NavIcon>
                    <NavText>Add Investigation</NavText>
                  </NavItem>
                  <NavItem eventKey="view-all">
                    <NavIcon>
                      <i className="fa fa-fw fa-users-viewfinder" style={{ fontSize: "1.75em" }} />
                    </NavIcon>
                    <NavText>View All Investigations</NavText>
                  </NavItem>
                  <NavItem eventKey="facial-recognition">
                    <NavIcon>
                      <img className="fr_ic" src={FaceRecog} alt="Facial Recognition" />
                    </NavIcon>
                    <NavText>Facial Recognition</NavText>
                  </NavItem>
                  <NavItem eventKey="chat">
                    <NavIcon>
                      <i className="fa-brands fa-fw fa-rocketchat" style={{ fontSize: "1.75em" }} />
                    </NavIcon>
                    <NavText>AI Chat</NavText>
                  </NavItem>
                  <NavItem eventKey="ai-chat">
                    <NavIcon>
                      <i className="fa fa-fw fa-diagram-project" style={{ fontSize: "1.75em" }} />
                    </NavIcon>
                    <NavText>View Neural Net</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
            </React.Fragment>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/chat" element={<AIChat data={Data} />} />
      </Routes>
    </Router>
  );
}

export default App;
