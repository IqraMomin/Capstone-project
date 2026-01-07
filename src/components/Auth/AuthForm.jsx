import React,{useState} from 'react'
import "./AuthForm.css";
import { Button, Form} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { signup ,login} from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

function AuthForm() {
    const [isLogin,setIsLogin] = useState(true);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
   

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0 || !isLogin && confirmPassword.trim().length === 0) {
            setError("All Fields are required");
            return;
        }
        if (!isLogin && password !== confirmPassword) {
            setError("Password did not match");
            return;
        }
        setError("");
          const userData = {
              email,password,returnSecureToken:true
          }
          if(isLogin){
            dispatch(login(userData));
            
          }else{
            const handleLogin = ()=>{
                setIsLogin(true);
            }
            dispatch(signup({userData,handleLogin}));
          }
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        
    }

    return (
        <React.Fragment>
            <div className=' auth-form-div p-4' style={{width:"380px",height:"65%",backgroundColor:"#70511630",borderRadius:"20px"}}>
                <h3>{isLogin ? "LOGIN" : "SignUp"}</h3>
                <br/>
                <Form onSubmit={formSubmitHandler} className='d-flex flex-column gap-3'>
                    <Form.Group controlId='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                    {!isLogin && <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type='password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                    </Form.Group>}
                    
                    <Button className='p-2' type='submit' style={{background:"#705116",color:"white",border:"0"}}>{isLogin ? "LOGIN" : "SIGNUP" }</Button>
                </Form>
                {isLogin && <div className='text-center mt-3'>
                    <Link to="/reset" style={{color:"#705116"}}>Forgot Password</Link>
                    
                </div>}
                <Button className='w-100 mt-4 p-2' onClick={()=>{setIsLogin(prev=>!prev)}}
                style={{background:"#705116",color:"white",border:"0"}}>
                {isLogin ? "Create New Account" : "Have an account? Login"}
                    </Button>
               
                


            </div>
        </React.Fragment>
    )
}

export default AuthForm
