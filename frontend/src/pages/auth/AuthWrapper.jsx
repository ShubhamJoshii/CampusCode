import React, { useEffect } from 'react'
import "./auth.css";
import { useDispatch } from 'react-redux';
import { resetData } from '../../redux/reducer/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.from?.pathname + location.state?.from?.search || '/';
    const handleJoinLoginSuccess = async () => {
        navigate(redirectPath, { replace: true });
    };

    useEffect(() => {
        dispatch(resetData())
    }, [])

    return (
        <div className='authContainer'>
            <div className='authContainer-inner'>
                {/* {children} */}
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { onAuthSuccess: handleJoinLoginSuccess });
                    }
                    return child;
                })}
            </div>
        </div>
    )
}

export default AuthWrapper