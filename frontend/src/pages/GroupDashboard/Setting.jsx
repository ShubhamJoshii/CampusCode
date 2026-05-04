import React, { useState } from "react";
import "./Setting.css";
import { FiUsers, FiLock, FiMail } from "react-icons/fi";
import { Edit3 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeGroupDescription, changeGroupName, changeJoiningMethod, fetchGroupDetails } from "../../redux/reducer/groupSlice";

const Setting = ({ groupDetails }) => {
  const [isJoinable, setIsJoinable] = useState(groupDetails?.canJoinByLink || false);
  const [editingField, setEditingField] = useState("");
  const [groupName, setGroupName] = useState(groupDetails?.name || "My Coding Group");
  const [groupDesc, setGroupDesc] = useState(groupDetails?.description || "A community built for competition and skill development.");
  const dispatch = useDispatch();

  const { _id } = useParams();

  const handleNameSubmit = async () => {
    try {
      const response = await dispatch(changeGroupName({ _id, name: groupName })).unwrap();
      dispatch(fetchGroupDetails(_id));
    } catch (error) {
    }
  }

  const handleDescriptionSubmit = async () => {
    try {
      const response = await dispatch(changeGroupDescription({ _id, description: groupDesc })).unwrap();
      dispatch(fetchGroupDetails(_id));
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }

  const handleJoinMethod = async () => {
    try {
      const response = await dispatch(changeJoiningMethod({ _id })).unwrap();
      console.log("CLcick");
      dispatch(fetchGroupDetails(_id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Group Settings</h1>
      </div>

      {/* Group Info */}
      <div className="card">
        <h2>Group Info</h2>

        <div className="row row-border">
          <div className="row-left">
            <FiUsers />
            <span>Group Name</span>
          </div>
          <div className="row-right">
            {editingField === "name" ? (
              <>
                <input
                  className="edit-input slide-in"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  // onBlur={() => setEditingField(null)}
                  autoFocus
                />
                <button onClick={handleNameSubmit}>save</button>
              </>
            ) : (
              <>
                <span>{groupDetails?.name ?? "My Coding Group"}</span>
                <Edit3 onClick={() => setEditingField("name")} />
              </>
            )}
          </div>
        </div>

        <div className="row row-border">
          <div className="row-left">
            <FiMail />
            <span>Description</span>
          </div>
          <div className="row-right">
            {editingField === "description" ? (
              <>
                <input
                  className="edit-input slide-in"
                  value={groupDesc}
                  onChange={(e) => setGroupDesc(e.target.value)}
                  autoFocus
                />
                <button onClick={handleDescriptionSubmit}>save</button>
              </>
            ) : (
              <><span>{groupDetails?.description || "A community built for competition and skill development."}</span>
                <Edit3 onClick={() => setEditingField("description")} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="card">
        <h2>Access & Security</h2>

        <div className="row row-border">
          <div className="row-left">
            <FiLock />
            <div className="label-group">
              <span>Public Join</span>
              <small>Users can join via link or invitation code</small>
            </div>
          </div>
          <div className="row-right">
            <label className="switch">
              <input
                type="checkbox"
                checked={groupDetails?.isPublic}
                onChange={handleJoinMethod}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center">
          <h2>Scoring & Honor System</h2>
          <div className="flex gap-3">
            <span className="admin-badge">Admin Only</span>
            <Edit3 className="w-4" onClick={() => setEditingField("description")} />
          </div>
        </div>
        <p className="section-desc">
          Configure automated scoring logic for group contests and daily challenges.
        </p>

        {/* Fast Submission Bonus */}
        <div className="row row-border">
          <div className="row-left">
            <FiUsers />
            <div className="label-group">
              <span>Fast Solution Bonus</span>
              <small>Award extra points for solutions within the first 10 mins.</small>
            </div>
          </div>
          <span className="value-tag">+15 pts</span>

        </div>

        {/* Wrong Answer Penalty */}
        <div className="row row-border">
          <div className="row-left">
            <FiLock />
            <div className="label-group">
              <span>Wrong Answer Deduction</span>
              <small>Subtract marks for every failed test case submission.</small>
            </div>
          </div>
          <span className="value-tag penalty">-5 pts</span>

        </div>

        {/* Honor Rank System */}
        <div className="row">
          <div className="row-left">
            <FiMail />
            <div className="label-group">
              <span>Inactivity Penalty</span>
              <small>Deduct Honor Rank if a problem is opened but not solved.</small>
            </div>
          </div>
          <span className="value-tag penalty">-2 Honor</span>

        </div>
      </div>



      {/* Danger Zone */}
      <div className="danger">
        <h2>Danger Zone</h2>
        <p>
          Deleting this group will remove all members, posts, and data permanently.
        </p>

        <button
          className="delete-btn"
          onClick={() => console.log("Delete Group")}
        >
          Delete Group
        </button>
      </div>
    </div>
  );
};

export default Setting;