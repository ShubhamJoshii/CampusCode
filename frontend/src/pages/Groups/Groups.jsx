import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateGroup from '../../components/CreateGroup.jsx/CreateGroup';
import { createGroupName, fetchGroups } from '../../redux/reducer/groupSlice';
import "./Groups.css";

const Groups = () => {
  const [createGroupShow, setCreateGroupShow] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups, groupName } = useSelector(state => state.groups);

  const stats = [
    { head: "Total groups", text: groups.length },
    { head: "🔥 Streak", text: "5 days" },
    { head: "Status", text: "active" },
  ];

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const createGroup = () => {
    setCreateGroupShow(true);
  };

  const joinGroup = () => {
    console.log("Joining group with code:", code);
  };

  return (
    <div className='groups-container mainContent hide-scrollbar'>
      <CreateGroup
        createGroupShow={createGroupShow}
        setCreateGroupShow={setCreateGroupShow}
      />

      {/* Stats Section */}
      <div className="stats-row">
        {stats.map((curr, id) => {
          let typeClass = "";
          if (curr.head === "Total groups") typeClass = "groups-card";
          if (curr.head === "🔥 Streak") typeClass = "streak-card";
          if (curr.head === "Status") typeClass = "status-card";

          return (
            <div className={`cardBorder stat-item ${typeClass}`} key={id}>
              <h2 className="cardHeading">{curr.head}</h2>
              <div className='stat-value'>
                <p>{curr.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Section */}
      <div className="actions-grid">
        <div className="cardBorder action-card">
          <h2 className="action-title">
            <span className="icon-box green">➕</span>
            Create Group
          </h2>
          <input
            value={groupName}
            onChange={(e) => dispatch(createGroupName(e.target.value))}
            placeholder="e.g. Design Team"
            className="group-input"
          />
          <button onClick={createGroup} className="btn-primary">
            Create New Group
          </button>
        </div>

        <div className="cardBorder action-card">
          <h2 className="action-title">
            <span className="icon-box blue">🔗</span>
            Join Group
          </h2>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter invitation code"
            className="group-input"
          />
          <button onClick={joinGroup} className="btn-secondary">
            Join with Code
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="groups-list-wrapper">
        <h2 className="list-title">
          Your Groups <span className="count">({groups.length})</span>
        </h2>

        {groups.length === 0 ? (
          <div className="empty-state">
            <p>No groups joined yet. Start by creating one! ❌</p>
          </div>
        ) : (
          <div className="groups-grid">
            {groups?.map((g) => (
              <div
                key={g._id}
                onClick={() => navigate(`/groups/${g._id}`)}
                className="group-item-card"
              >
                <h3>{g.name}</h3>
                <span className="group-code">CODE: {g.invitationCode}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;