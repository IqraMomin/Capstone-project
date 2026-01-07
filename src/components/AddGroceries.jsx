import React, { useEffect, useState } from 'react'
import MyModal from './UI/MyModal'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addGroceries, editGroceries } from '../store/slices/groceriesSlice';

function AddGroceries({show,onClose,isEdit,setIsEdit}) {
    const [name,setName] =useState("");
    const [note,setNote] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isEdit){
            setName(isEdit.name||"");
            setNote(isEdit.note||"");
        }else{
            resetForm()
        }
    },[isEdit]);

    const formSubmitHandler=(e)=>{
        e.preventDefault();
        const data = {
            name,
            completed:false,
            note:note?note:"Add a note"
        }
        if(isEdit){
            dispatch(editGroceries({data,id:isEdit.id}));
        }else{
            dispatch(addGroceries(data));
        
        }
        resetForm();
        setIsEdit(null);
    }
    const resetForm= ()=>{
        setName("");
        setNote("");
     }

    return (
       
          <MyModal onSave={formSubmitHandler} show={show} onClose={onClose} title="Add Grocery" saveText={isEdit?"Edit Grocery":"Add Grocery"}>
        <Form>
        <Form.Control placeholder='What to buy' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <Form.Control placeholder='Add a note' value={note} onChange={(e)=>{setNote(e.target.value)}}/>
            </Form>  
        </MyModal>
    )
}

export default AddGroceries
