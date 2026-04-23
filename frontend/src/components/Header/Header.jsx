import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/CampusCode3.png";
import "./Header.css";

import {
  User, List, Book, PieChart, Coins,
  FlaskConical, ClipboardList, Code, Settings, Sun, LogOut, ChevronRight,
  ChartColumn
} from "lucide-react";
import { logoutUser } from "../../redux/reducer/userSlice";

const GridItem = ({ icon, label, link, onClick }) => (
  <NavLink to={link} className={`gridItem mb-4`} onClick={onClick}>
    {icon}
    <span>{label}</span>
  </NavLink>
);

const MenuItem = ({ icon, label, style, fun}) => (
  <div className={`menu-item text-[#374151]  ${style}`} onClick={() => fun()}>
    <div className="menu-item-left">
      <span className="menu-icon">{icon}</span>
      <span className="menu-label">{label}</span>
    </div>
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = Boolean(
    data?.user?.email &&
    data?.user?._id &&
    data?.user?.firstName
  );

  const logout = async () => {
    await dispatch(logoutUser()).unwrap();
    localStorage.clear();
  };


  return (
    <header className="cardBorder z-10">
      <img src={Logo} alt="Logo" className="headerLogo" />

      <div className="flex items-center gap-5 z-100 ">

        {isAuthenticated ?
          <>
            <p>🔥10</p>
            <div className="profileWrapper">
              <button className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
                <div className="avatar">
                  <User size={22} />
                </div>
              </button>

              {isOpen && (
                <>
                  <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
                  <div className="profileDropdown">
                    <div className="dropdown-header">
                      <div className="avatar">
                        <User size={32} />
                      </div>
                      <span className="username">{data?.user?.firstName
                        ? `${data?.user?.firstName} ${data?.user?.lastName || ""}`
                        : "Username"}</span>
                    </div>
                    <div className="dropdown-grid">
                      <GridItem icon={<List size={20} color="#f97316" />} label="Problems" link="/problems" onClick={() => setIsOpen(false)} />
                      <GridItem icon={<PieChart size={20} color="#10b981" />} label="Progress" link="/progress" onClick={() => setIsOpen(false)} />
                      <GridItem icon={<ChartColumn size={20} color="#576DD7" />} label="Points" link="/leaderboard" onClick={() => setIsOpen(false)} />
                    </div>

                    <div className="dropdown-links">
                      <MenuItem icon={<Settings size={18} />} label="Settings" style="hover:bg-gray-100" fun={()=>navigate("/setting")} />
                      <MenuItem icon={<LogOut size={18} />} label="Sign Out" style="hover:bg-red-50 hover:text-red-600" fun={logout} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>

          :
          <button className="login" onClick={() => navigate("/login")}>
            Sign In
          </button>
        }
      </div>

    </header>
  );
};

export default Header;