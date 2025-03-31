import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import HomeScreen from "./components/HomeDashboard/HomeDashboard";
import Login from "./screens/Login";
import SideBar from "./atoms/DashboardMain";
import AIChat from "./screens/AIChat";
import Data from "./TestDataPoint/Intel";
import AddIntel from "./screens/AddIntel";
import FacialRecognition from "./screens/FacialRecognition";
import Intelholder from "./atoms/Intelholder";
import NeuralNet from "./operations/NeuralNet";
import ML from "./screens/ML";
import AWSFaces from "./atoms/AWSFaces";
import WebCrawler from "./screens/WebCrawler";
import SocialMedia from "./screens/SocialMedia";

const AppLayout = () => {
  const location = useLocation();
  const hideSideBarOnRoute = ["/"];
  const isHidden = hideSideBarOnRoute.includes(location.pathname);

  return (
    <div className="lay">
      {!isHidden && (
        <div className="sidebar">
          <SideBar />
        </div>
      )}
      <div className="outta">
        <Outlet />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<HomeScreen />} />
          <Route path="/chat" element={<AIChat data={Data} />} />
          <Route path="/add-intel" element={<AddIntel />} />
          <Route path="/face-recog" element={<FacialRecognition />} />
          <Route path="/view-all" element={<Intelholder />} />
          <Route path="/iiims-net" element={<ML/>} />
          <Route path="/web-crawler" element={<SocialMedia/>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
