import React, { useEffect } from 'react';
import { checkAuth } from '../../CheckAuth';
import { useDispatch, useSelector } from 'react-redux';
import './JoinGroup.css'; 
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchGroupMembers, fetchJoinGroupDetails, joinNewGroup } from '../../redux/reducer/groupSlice';
import Loading from '../Loading';
import { toast } from 'react-toastify';

const colors = [
  "bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500",
  "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
];

const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const JoinGroup = () => {
  const [searchParams] = useSearchParams();
  const invite = searchParams.get("invite");
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.user);
  const { status, groupDetails, membersDetails } = useSelector(state => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    let _id = invite;
    dispatch(fetchJoinGroupDetails(_id));
    dispatch(fetchGroupMembers(_id));
  }, [invite]);

  const isLoggedIn = checkAuth(user);
  const handleLoginClick = () => {
    navigate('/login', { state: { from: location } });
  };
  const handleJoinGroup = async () => {
    console.log("Join Group", groupDetails);
    try {
      const response = await dispatch(joinNewGroup(groupDetails.invitationCode)).unwrap();
      toast.success(response?.msg || "Joined successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.msg || "User already in group");
    } finally {
      navigate(`/groups/${invite}`);
    }
  };


  if (status == "loadingWhole") {
    return <Loading style="flex-1 !h-[100%] bg-white" />
  }

  return (
    <div className="joinGroupContainer">
      <div className="card">

        <div className="banner">
          <div className="overlay"></div>
        </div>
        {
          groupDetails?.name ? (
            <div className="content">
              <div className="group-icon">{groupDetails?.name[0]}</div>

              <h2 className="title">{groupDetails?.name}</h2>
              <p className="description">
                {groupDetails?.description || "A community built for competition and skill development."}
              </p>

              <div className="stats">
                <p className="label">Members</p>
                <p className="value">{membersDetails.length}</p>
              </div>

              <div className="avatar-stack">
                {membersDetails.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    title={member.name}
                    className={`avatar ${getAvatarColor(member.firstName)}`}
                  >
                    {member.firstName[0]}
                  </div>
                ))}

                {membersDetails.length > 5 && (
                  <div className="avatar-more">
                    +{membersDetails.length - 5}
                  </div>
                )}
              </div>

              <div className="divider"></div>

              {!isLoggedIn ? (
                <>
                  <p className="description" style={{ marginBottom: '0.75rem' }}>
                    Login to join this group
                  </p>
                  <button className="btn btn-login" onClick={handleLoginClick}>
                    Login
                  </button>
                </>
              ) : (
                <button className="btn btn-join" onClick={handleJoinGroup}>
                  Join Group 🚀
                </button>
              )}
            </div>
          ) : (
            <div className="content">
              <h3 className="title">Group Not Found</h3>

              <p className="description">
                This group either doesn’t exist or is not accessible via this link.
                Please contact the admin for access.
              </p>

              <div className="divider"></div>

              <NavLink to={"/"} className="backHome" >
                Go Home
              </NavLink>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default JoinGroup;