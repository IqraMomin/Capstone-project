import React, { useEffect, useState } from 'react'
import MyModal from './UI/MyModal'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addChores, editChores } from '../store/slices/choresSlice';

function AddChores({ show, onClose, isEdit, setIsEdit }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit) {
            setName(isEdit.name || "");
            setDate(isEdit.date || "");
            setNote(isEdit.note || "");
        } else {
            resetForm()
        }
    }, [isEdit]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            name,
            date,
            completed: false,
            note: note ? note : "Add a note"
        }
        if (isEdit) {
            dispatch(editChores({ data, id: isEdit.id }));
        } else {
            dispatch(addChores(data));

        }
        resetForm();
        setIsEdit(null);
    }
    const resetForm = () => {
        setName("");
        setDate("");
        setNote("");
    }

    return (

        <MyModal onSave={formSubmitHandler} show={show} onClose={onClose} title="Add Chore" saveText={isEdit ? "Edit Chore" : "Add Chore"}>
            <Form>
                <Form.Control className='mt-3' placeholder='Task Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                <Form.Control className='mt-3' placeholder='Add a note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                <Form.Group className='mt-3' controlId='date'>
                <Form.Label className='ms-2'><strong>To be Completed By</strong></Form.Label>
                <Form.Control type='date' value={date} onChange={(e) => { setDate(e.target.value) }} />
                
                </Form.Group>
            </Form>
        </MyModal>
    )
}

export default AddChores
