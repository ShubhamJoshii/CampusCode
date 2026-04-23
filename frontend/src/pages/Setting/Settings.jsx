import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  return (
    <div className="mainContent hide-scrollbar settings-container">

      {/* HEADER */}
      <div className="settings-header">
        <h1>Settings ⚙️</h1>

        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          Back
        </button>
      </div>

      {/* GENERAL */}
      <div className="card">
        <h2>General</h2>

        <div className="row row-border">
          <span>Username</span>
          <span>→</span>
        </div>

        <div className="row row-border">
          <span>Email</span>
          <span>→</span>
        </div>

        <div className="row">
          <span>Password</span>
          <span>→</span>
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
          <button className="connect-btn">Connect</button>
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