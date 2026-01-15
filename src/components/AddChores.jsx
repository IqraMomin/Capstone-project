import React, { useEffect, useState } from 'react'
import MyModal from './UI/MyModal'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addChores, editChores } from '../store/slices/choresSlice';

function AddChores({ show, onClose, isEdit, setIsEdit }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [reminderAt, setReminderAt] = useState("");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    now.setSeconds(0, 0);

    const minDateTime = now.toISOString().slice(0, 16);



    useEffect(() => {
        if (isEdit) {
            setName(isEdit.name || "");
            setDate(isEdit.date || "");
            setNote(isEdit.note || "");
            setReminderAt(isEdit.reminderAt || "");

        } else {
            resetForm()
        }
    }, [isEdit]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            name,
            date,
            reminderAt,
            reminded: false,
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
        setReminderAt("");
    }

    return (

        <MyModal onSave={formSubmitHandler} show={show} onClose={onClose} title="Add Chore" saveText={isEdit ? "Edit Chore" : "Add Chore"}>
            <Form>
                <Form.Control className='mt-3' placeholder='Task Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                <Form.Control className='mt-3' placeholder='Add a note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                <Form.Group className='mt-3' controlId='date'>
                    <Form.Label className='ms-2'><strong>To be Completed By</strong></Form.Label>
                    <Form.Control type='date' min={today} value={date} onChange={(e) => { setDate(e.target.value) }} />
                </Form.Group>
                <Form.Group className='mt-3' controlId='datetime'>
                    <Form.Label className='ms-2'><strong>Reminder At</strong></Form.Label>
                    <Form.Control type='datetime-local' min={minDateTime} value={reminderAt} onChange={(e) => { setReminderAt(e.target.value) }} />
                </Form.Group>
            </Form>
        </MyModal>
    )
}

export default AddChores
