import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGroupDetails } from "../../redux/reducer/groupSlice";

function GroupDashboard() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { groupDetails } = useSelector(state => state.groups);
  const dispatch = useDispatch();

  // 👉 Dummy group data (replace backend later if needed)
  const groupData = {
    id: _id || "GROUP-12345",
    totalMembers: 128,
    totalQuestions: 56,
    yourRank: 7,
  };

  useEffect(() => {
    dispatch(fetchGroupDetails(_id));
  }, [])

  return (
    <div className="mainContent hide-scrollbar p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Group Dashboard 🚀: </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white/20 px-4 py-2 rounded hover:bg-white/30"
        >
          Back
        </button>
      </div>
      <h2 className="text-2xl font-bold uppercase">{groupDetails.name}</h2>

      {/* GROUP CARD */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Group ID</h2>
        <p className="text-gray-700 break-all">{groupDetails?._id}</p>
      </div>

      {/* QUICK STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 p-4 rounded-xl">
          <h2>Total Members 👥</h2>
          <p className="text-2xl font-bold">{groupDetails?.totalMembers}</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <h2>Total Questions 📚</h2>
          <p className="text-2xl font-bold">{groupDetails?.totalQuestions}</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <h2>Your Rank 🏆</h2>
          <p className="text-2xl font-bold">{groupDetails?.yourRank}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate(`/leaderboard/${groupDetails?._id}`)}
          className="bg-yellow-400 text-black p-4 rounded-xl hover:scale-105 transition"
        >
          🏆 Leaderboard
        </button>

        <button
          onClick={() => alert("Coming Soon 🚧")}
          className="bg-green-500 p-4 rounded-xl hover:scale-105 transition"
        >
          📚 Add Question
        </button>

        <button
          onClick={() => alert("Coming Soon 🚧")}
          className="bg-blue-500 p-4 rounded-xl hover:scale-105 transition"
        >
          👥 Members
        </button>

        <button
          onClick={() => alert("Coming Soon 🚧")}
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          💬 Chat
        </button>
      </div>
    </div>
  );
}

export default GroupDashboard;