import React, { useState } from "react";
import "./DashboardMain.css";
import FaceRecog from "../media/face_recog.svg";
import { useNavigate } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function DashboardMain({children}) {
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleToggle = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className={`dashboard-container ${isSideNavOpen ? "side-nav-open" : ""}`}>
      <div className="menu side-nav">
        <SideNav
          onSelect={(selected) => {
            navigate("/" + selected);
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav>
            {/* Item One */}
            <NavItem eventKey="dashboard ">
              <NavIcon>
                <i
                  className="fa fa-fw fa-chart-line"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Dashboard</NavText>
            </NavItem>

            <NavItem eventKey="add-intel">
              <NavIcon>
                <i
                  className="fa fa-fw fa-file-circle-plus"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Add Investigation</NavText>
            </NavItem>

            <NavItem eventKey="view-all">
              <NavIcon>
                <i
                  className="fa fa-fw fa-users-viewfinder"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>View All Investigations</NavText>
            </NavItem>

            <NavItem eventKey="face-recog">
              <NavIcon>
                <img className="fr_ic" src={FaceRecog} />
              </NavIcon>
              <NavText>Facial Recognition</NavText>
            </NavItem>

            <NavItem eventKey="chat">
              <NavIcon>
                <i
                  className="fa-brands fa-fw fa-rocketchat"
                  style={{ fontSize: "1.75em" }}
                />{" "}
              </NavIcon>
              <NavText>AI Chat</NavText>
            </NavItem>

            <NavItem eventKey="iiims-net">
              <NavIcon>
                <i
                  className="fa fa-fw fa-diagram-project"
                  style={{ fontSize: "1.75em" }}
                />{" "}
              </NavIcon>
              <NavText>View Nueral sNet</NavText>
            </NavItem>
            <NavItem eventKey="web-crawler">
              <NavIcon>
<i class="fa-solid fa-magnifying-glass"    
           style={{ fontSize: "1.75em" }}
                />{" "}
              </NavIcon>
              <NavText>WebCrawler</NavText>
            </NavItem>

          </SideNav.Nav>
        </SideNav>
      </div>
      <div className="content">{children}</div>

    </div>
  );
}

export default DashboardMain;
