import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import CreateGroup from '../../components/CreateGroup.jsx/CreateGroup';
const Home = () => {
  const [createGroupShow, setCreateGroupShow] = useState(false);
  const [stats, setStats] = useState([
    {
      head: "Total groups",
      text: 0
    },
    {
      head: "🔥 Streak",
      text: "5 days"
    },
    {
      head: "Status",
      text: "active"
    },
  ])
  
  const [groups, setGroups] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const createGroup = () => {
    console.log("Creating group:", name);
    setCreateGroupShow(true);
  };

  const joinGroup = () => {
    console.log("Joining group with code:", code);
  };

  return (
    <div className='mainContent hide-scrollbar'>
      <CreateGroup createGroupShow={createGroupShow} setCreateGroupShow={setCreateGroupShow} name={name} setName={setName}/>
      <div className="flex gap-6">
        {
          stats.map((curr, id) => {
            let className = "";
            (curr.head == "Total groups" && (className = "groups"));
            (curr.head == "🔥 Streak" && (className = "streak"));
            (curr.head == "Status" && (className = "statusActive"));
            return (
              <div className={"cardBorder p-6 flex-1 " + className} key={id}>
                <h2 className="cardHeading">{curr.head}</h2>
                <div className='flex items-center mt-2'>
                  <span></span>
                  <p >{curr.text}</p>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="cardBorder p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-green-100 text-green-600 p-1.5 rounded-lg mr-2">➕</span>
            Create Group
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Design Team"
            className="w-full p-3 mb-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          <button
            onClick={createGroup}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-indigo-100"
          >
            Create New Group
          </button>
        </div>

        {/* JOIN */}
        <div className="cardBorder p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mr-2">🔗</span>
            Join Group
          </h2>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter invitation code"
            className="w-full p-3 mb-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          <button
            onClick={joinGroup}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-slate-200"
          >
            Join with Code
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          Your Groups <span className="ml-2 text-slate-400 font-normal">({groups.length})</span>
        </h2>

        {groups.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
            <p className="text-slate-400">No groups joined yet. Start by creating one! ❌</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((g) => (
              <div
                key={g._id}
                onClick={() => navigate(`/group/${g._id}`)}
                className="group bg-slate-50 border border-slate-100 p-5 rounded-xl hover:border-indigo-300 hover:bg-white hover:shadow-lg transition-all cursor-pointer"
              >
                <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{g.name}</h3>
                <p className="text-xs font-mono mt-2 text-slate-400 bg-slate-200/50 w-fit px-2 py-1 rounded">
                  CODE: {g.code}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default Home;