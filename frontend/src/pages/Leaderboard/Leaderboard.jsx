import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Leaderboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");

  const myId = "2";

  // Dummy data
  const data = [
    { userId: "1", name: "Aman", score: 95, streak: 7 },
    { userId: "2", name: "You", score: 88, streak: 5 },
    { userId: "3", name: "Ravi", score: 82, streak: 4 },
    { userId: "4", name: "Neha", score: 75, streak: 6 },
    { userId: "5", name: "Karan", score: 70, streak: 3 },
  ];

  const sortedData = [...data].sort((a, b) =>
    sortBy === "score"
      ? b.score - a.score
      : (b.streak || 0) - (a.streak || 0)
  );

  const filteredData = sortedData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mainContent hide-scrollbar p-6 leaderBoard">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leaderboard 🏆</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded border w-full"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="score">Score</option>
          <option value="streak">Streak</option>
        </select>
      </div>

      <div className="flex gap-6">
        {filteredData.slice(0, 3).map((user, i) => (
          <div
            key={user.userId}
            className="flex-1 cardBorder p-4 text-center"
          >
            <h2 className="text-2xl">
              {i === 0 && "🥇"}
              {i === 1 && "🥈"}
              {i === 2 && "🥉"}
            </h2>
            <p className="font-bold">{user.name}</p>
            <p>{user.score} pts</p>
          </div>
        ))}
      </div>

      {/* LIST */}
      {filteredData.map((user, index) => (
        <div
          key={user.userId}
          className={`p-4 mb-3 rounded-xl flex justify-between items-center shadow bg-white
            ${user.userId === myId ? "border-2 border-green-500" : ""}
          `}
        >
          <div className="w-full">
            <span className="font-bold">
              #{index + 1} {user.name}
              {user.userId === myId && (
                <span className="text-green-600 ml-2">(You)</span>
              )}
            </span>

            <p className="text-sm text-gray-600">
              🔥 {user.streak || 0} days
            </p>

            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div
                className="bg-green-500 h-2 rounded"
                style={{
                  width: `${Math.min(user.score * 10, 100)}%`,
                }}
              />
            </div>
          </div>

          <span className="font-bold ml-4">{user.score}</span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;