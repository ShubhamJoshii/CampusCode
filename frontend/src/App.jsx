
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fetchUser } from './redux/reducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import Wrapper from './Wrapper';
import Loading from './pages/Loading';
import { Bounce, ToastContainer } from 'react-toastify';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/register'));
const Leaderboard = lazy(() => import('./pages/Leaderboard/Leaderboard'));
const Groups = lazy(() => import('./pages/Groups/Groups'));
const Problems = lazy(() => import('./pages/Problems/Problems'));
const Progress = lazy(() => import('./pages/Progress/Progress'));
const Settings = lazy(() => import('./pages/Setting/Settings'));
const ProblemEditor = lazy(() => import('./pages/ProblemEditor/ProblemEditor'));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));

import './App.css'
import { RedirectIfAuthenticated } from "./CheckAuth";


// const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  // const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (status == "loadingUser") {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Wrapper>
              <Home />
            </Wrapper>} />
            <Route path="/leaderboard" element={<Wrapper>
              <Leaderboard />
            </Wrapper>} />
            <Route path="/progress" element={<Wrapper>
              <Progress />
            </Wrapper>} />
            <Route path="/groups" element={<Wrapper>
              <Groups />
            </Wrapper>} />
            <Route path="/problems" element={<Wrapper>
              <Problems />
            </Wrapper>} />
            <Route path="/setting" element={<Wrapper>
              <Settings />
            </Wrapper>} />
            <Route path="/problemeditor" element={<Wrapper>
              <ProblemEditor />
            </Wrapper>} />
            <Route path="/problemeditor/:_id" element={<Wrapper>
              <ProblemEditor />
            </Wrapper>} />

            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/forgotPassword"
              element={
                <RedirectIfAuthenticated>
                  <ForgetPassword />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthenticated>
                  <Register />
                </RedirectIfAuthenticated>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
