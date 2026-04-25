import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGroupDetails } from "../../redux/reducer/groupSlice";
import "./GroupDashboard.css"; // 👈 Import the pure CSS file
import MemberList from "../MemberList/MemberList";

function GroupDashboard() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { groupDetails } = useSelector(state => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupDetails(_id));
  }, [dispatch, _id]);

  return (
    <>
      {/* <MemberList /> */}
      <div className="mainContent hide-scrollbar p-6">
        {/* HEADER */}
        <div className="header-section">
          <h1 className="main-title">Group Dashboard 🚀: </h1>
          <button onClick={() => navigate("/dashboard")} className="back-button">
            Back
          </button>
        </div>

        <h2 className="group-name">{groupDetails?.name}</h2>

        {/* GROUP CARD */}
        <div className="group-card">
          <h2 className="group-id-label">Group ID</h2>
          <p className="group-id-value">{groupDetails?._id}</p>
        </div>

        {/* QUICK STATS */}
        <div className="stats-grid">
          <div className="stat-item">
            <h2>Total Members 👥</h2>
            <p className="stat-value">{groupDetails?.totalMembers}</p>
          </div>

          <div className="stat-item">
            <h2>Total Questions 📚</h2>
            <p className="stat-value">{groupDetails?.totalQuestions}</p>
          </div>

          <div className="stat-item">
            <h2>Your Rank 🏆</h2>
            <p className="stat-value">{groupDetails?.yourRank}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="action-grid">
          <button
            onClick={() => navigate(`/leaderboard/${groupDetails?._id}`)}
            className="action-btn btn-yellow"
          >
            🏆 Leaderboard
          </button>

          <button onClick={() => alert("Coming Soon 🚧")} className="action-btn btn-green">
            📚 Add Question
          </button>

          <button onClick={() => alert("Coming Soon 🚧")} className="action-btn btn-blue">
            👥 Members
          </button>

          <button onClick={() => alert("Coming Soon 🚧")} className="action-btn btn-pink">
            💬 Chat
          </button>
        </div>
      </div>
    </>
  );
}

export default GroupDashboard;