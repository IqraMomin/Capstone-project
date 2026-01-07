import React, { useState } from 'react'
import AuthForm from './Auth/AuthForm'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Homepage from './Homepage';
import ResetForm from './Auth/ResetForm';
import Header from './Header';
import { Button } from 'react-bootstrap';
import { authActions } from '../store/slices/authSlice'
import { useDispatch } from 'react-redux';
import UserProfile from './UserProfile';
import Groceries from './Groceries';


function Mainpage() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [showProfile,setShowProfile] = useState(false);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");

  }



         
  return (
    <div className="h-100 w-100 d-flex flex-column">
      {/* Header */}
      {isLoggedIn &&  <div className='d-flex align-items-center'>
        <Header />
        <div className='flex-grow-1 text-end m-4'>
        <Button style={{ background: "none", color: "black", border: "none" }}
        onClick={()=>{setShowProfile(true)}}>
          <i className="bi bi-person-circle fs-4"></i>
        </Button>
        {showProfile && <UserProfile show={showProfile} onClose={()=>{setShowProfile(false)}}/>}
        <Button variant="outline-danger" onClick={logoutHandler}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </Button>
          
        </div>
      </div>
        }


      {/* Content Area */}
      <div className="flex-grow-1 d-flex overflow-y-auto justify-content-center align-items-center">
        <Switch>
          <Route path="/auth" exact>
            {isLoggedIn ? <Redirect to="/home" /> : <AuthForm />}
          </Route>

          <Route path="/home" exact>
            {isLoggedIn ? <Homepage /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/groceries" exact>
            {isLoggedIn ? <Groceries /> : <Redirect to="/auth" />}
          </Route>

          <Route path="/reset">
            {isLoggedIn ? <Redirect to="/home" /> : <ResetForm />}
          </Route>

          <Route path="/" exact>
            {isLoggedIn ? <Homepage /> : <Redirect to="/auth" />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Mainpage
