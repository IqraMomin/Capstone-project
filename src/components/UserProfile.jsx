import React,{useEffect, useState} from "react";
import { Modal, Button ,Form} from "react-bootstrap";
import {useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/slices/profileSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function UserProfile({
  show,
  onClose,
  title = "Profile",
  showSaveButton = true,
  closeText = "Close",
}) {

    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [mobile,setMobile] = useState("");
    const [edit,setEdit] = useState(false);
    const data = useSelector(state=>state.profile.user);
    const [editData,setEditData] = useState(null);
    const email = useSelector(state=>state.auth.email);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const history = useHistory();

    useEffect(()=>{
      if(editData){
        setName(editData.name || "");
        setAddress(editData.address || "");
        setMobile(editData.mobile || "");
      }else{
        setName("");
        setAddress("");
        setMobile("");
      }
    },[editData])
  
    const nameChangeHandler = (e)=>{
      setName(e.target.value);
    }
    const addressHandler=(e)=>{
      setAddress(e.target.value);
    }
    const mobileHandler=(e)=>{
      setMobile(e.target.value);
    }

  
  const formSubmitHandler = (e)=>{
    e.preventDefault();
     const profileData = {
        name,
        mobile,
        address
    }
    console.log(profileData);
    dispatch(updateProfile({userId:email,profileData}));
    setAddress("");
    setMobile("");
    setName("");
  }

  return (
    <Modal show={show} onHide={onClose} centered scrollable dialogClassName="modal-80w">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-scrollbar">
        {!isLoggedIn ? 
        <div className="d-flex justify-content-center">
           <Button onClick={()=>{
            history.push("/user/auth");
            onClose();
           }} style={{width:"50%"}} variant="outline-info">Sign In</Button>       
        </div>:
        (
          <>
        <div className="d-flex-column" style={{borderBottom:"1px solid black",padding:"0.5rem",lineHeight:"1.7"}}>
        <div>
                Email:{email}
            </div>
            <div>
                Name:{data.name}
            </div>
            <div>
                Address:{data.address}
            </div>
            <div>
                Mobile No:{data.mobile}
            </div>
           

        </div>
      {edit && <Form onSubmit={formSubmitHandler}>
        <h4 className="mt-2">Edit Profile</h4>
                <div className='d-flex-column justify-content-center gap-5 align-items-center'>
                    <Form.Group controlId='name' className="mb-3">
                        <Form.Label className='w-100 text-left'>Name:</Form.Label>
                        <Form.Control style={{width:"300px"}} type='text' placeholder='Enter Your Name' onChange={nameChangeHandler} value={name}/>
                    </Form.Group>
                    <Form.Group controlId='address' className="mb-3">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control style={{width:"300px"}} type='text' onChange={addressHandler} value={address}/>
                    </Form.Group>
                    <Form.Group controlId='mobile' className="mb-3">
                        <Form.Label>Mobile No: </Form.Label>
                        <Form.Control style={{width:"300px"}} type='number' onChange={mobileHandler} value={mobile}/>
                    </Form.Group>
                    <div className="d-flex gap-3">
                    <Button variant="outline-danger" onClick={()=>{
                      setEdit(false)
                    }}>Cancel</Button>
                    <Button variant="outline-dark" type="submit">Submit</Button>
                    </div>
                    
                    </div>
                </Form>}
                </>)
        }
       
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {closeText}
        </Button>

        {showSaveButton && isLoggedIn && (
          <Button style={{backgroundColor:"#705116"}} onClick={()=>{
            setEdit(true)
            setEditData(data)}}>
            Edit Profile
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default UserProfile;
