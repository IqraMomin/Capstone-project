import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/slices/authSlice";
function ResetForm() {
  const resetInputRef = useRef();
  const dispatch = useDispatch();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const email = resetInputRef.current.value;
    dispatch(resetPassword(email));    
  };

  return (
      <div
        style={{ width: "380px", borderRadius: "16px",border:"0" }}
      >
        <h3 className="text-center mb-4" style={{color: "#705116"}}>Reset Password</h3>

        <form onSubmit={formSubmitHandler}>
          <label htmlFor="resetEmail">Registered Email</label>
          <input
            id="resetEmail"
            type="email"
            className="form-control my-2 py-2"
            ref={resetInputRef}
            required
          />

          <button className="btn btn-primary w-100 mt-3 p-2" style={{backgroundColor: "#705116",border:"0"}}>
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/auth" style={{color: "#705116"}}>Already a user? Login</Link>
        </div>
      </div>
  );
}

export default ResetForm;
