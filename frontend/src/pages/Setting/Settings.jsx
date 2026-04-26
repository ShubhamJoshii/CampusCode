import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  return (
    <div className="mainContent hide-scrollbar settings-container">

      {/* HEADER */}
      <div className="settings-header">
        <h1>Settings</h1>

        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft />
          Back
        </button>
      </div>

      {/* GENERAL */}
      <div className="card">
        <h2>General</h2>

        <div className="row row-border">
          <div className="row-left">
            <FiUser />
            <span>Username</span>
          </div>
          <FiChevronRight className="arrow" />
        </div>

        <div className="row row-border">
          <div className="row-left">
            <FiMail />
            <span>Email</span>
          </div>
          <FiChevronRight className="arrow" />
        </div>

        <div className="row">
          <div className="row-left">
            <FiLock />
            <span>Password</span>
          </div>
          <FiChevronRight className="arrow" />
        </div>
      </div>

      {/* SOCIAL */}
      <div className="card">
        <h2>Social Accounts</h2>

        <div className="row">
          <span>Google</span>
          <button className="connect-btn">Connect</button>
        </div>

        <div className="row">
          <span>GitHub</span>
          <button className="connect-btn connected">Connected</button>
        </div>

        <div className="row">
          <span>LinkedIn</span>
          <button className="connect-btn">Connect</button>
        </div>
      </div>

      {/* DANGER */}
      <div className="card danger">
        <h2>Danger Zone</h2>

        <button className="delete-btn">
          Delete Account
        </button>
      </div>

    </div>
  );
}

export default Settings;