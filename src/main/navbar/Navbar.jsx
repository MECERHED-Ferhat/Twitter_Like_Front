import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import DropMenu from "../../utility/DropMenu";
import UserContext from "../../context/userContext";
import DisUserContext from "../../context/disUserContext";

export default function Navbar() {
  const currentUser = useContext(UserContext);
  const disCurrentUser = useContext(DisUserContext);

  return (
    <div className="navbar_width" id="navbar-container">
      <nav className="navbar_width" id="navbar">
        <div id="nav-links">
          <Link id="nav-links-brand" to="/home">
            <span className="nav-links-icon">
              <i className="fab fa-twitter fa-fw"></i>
            </span>
          </Link>
          <NavLink
            activeClassName="nav-links-active"
            id="nav-links-home"
            to="/home"
          >
            <span className="nav-links-icon">
              <i className="fas fa-home fa-fw"></i>
            </span>
            <span className="nav-links-label">Home</span>
          </NavLink>
          <NavLink
            id="nav-links-explore"
            activeClassName="nav-links-active"
            to="/search"
          >
            <span className="nav-links-icon">
              <i className="fas fa-search fa-fw"></i>
            </span>
            <span className="nav-links-label">Search</span>
          </NavLink>
          {/* <div id="nav-links-notif">
            <span className="nav-links-icon">
              <i className="far fa-bell fa-fw"></i>
            </span>
            <span className="nav-links-label">Notifications</span>
          </div> */}
          {/* <div id="nav-links-msg">
            <span className="nav-links-icon">
              <i className="far fa-envelope fa-fw"></i>
            </span>
            <span className="nav-links-label">Messages</span>
          </div> */}
          <NavLink
            activeClassName="nav-links-active"
            id="nav-links-profile"
            to={`/${currentUser.user.username}`}
          >
            <span className="nav-links-icon">
              <i className="far fa-user fa-fw"></i>
            </span>
            <span className="nav-links-label">Profile</span>
          </NavLink>
          {/* <div id="nav-links-more">
            <span className="nav-links-icon">
              <i className="fas fa-ellipsis-h fa-fw"></i>
            </span>
            <span className="nav-links-label">More</span>
          </div> */}
        </div>

        <div id="nav-profile-container">
          <DropMenu
            button={() => (
              <div id="nav-profile">
                <div className="profile_pic" id="nav-profile-pic">
                  <img src={currentUser.user.picture} alt=""></img>
                </div>
                <div id="nav-profile-info">
                  <span id="nav-profile-name">
                    {currentUser.user.full_name}
                  </span>
                  <span id="nav-profile-user">
                    @{currentUser.user.username}
                  </span>
                </div>
              </div>
            )}
            menu={() => (
              <div id="nav-menu" className="drop_menu">
                <div
                  id="nav-menu-logout"
                  onClick={() => {
                    disCurrentUser({ type: "logout" });
                  }}
                >
                  Log out
                </div>
              </div>
            )}
          />
        </div>
      </nav>
    </div>
  );
}
