import React, { useState,useEffect } from 'react'
import { addToWallet, editWallet } from '../store/slices/walletSlice';
import { useDispatch } from 'react-redux';
import MyModal from './UI/MyModal';
import { Form} from 'react-bootstrap';

function AddToWallet({ show, onClose, isEdit, setIsEdit }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit) {
            setName(isEdit.name || "");
            setAmount(isEdit.amount || "");
            setType(isEdit.type || "");
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
            amount,
            type,
            date,
            completed: false,
            note: note ? note : "Add a note"
        }
        if (isEdit) {
            dispatch(editWallet({ data, id: isEdit.id }));
        } else {
            dispatch(addToWallet(data));

        }
        resetForm();
        setIsEdit(null);
    }
    const resetForm = () => {
        setName("");
        setDate("");
        setNote("");
        setAmount("");
        setType("");

    }

    return (
        <div>
            <MyModal onSave={formSubmitHandler} show={show} onClose={onClose} title="Add Transaction" saveText={isEdit ? "Edit Chore" : "Add Chore"}>
                <Form>
                    <Form.Control className='mt-3' placeholder='Person Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    <Form.Control className='mt-3' type='number' placeholder='Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                    <Form.Select
                        className='mt-3'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Select type</option>
                        <option value="lent">Lent</option>
                        <option value="borrowed">Borrowed</option>
                    </Form.Select>
                    <Form.Control className='mt-3' placeholder='Add a note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                    <Form.Group className='mt-3' controlId='date'>
                        <Form.Label className='ms-2'><strong>Date</strong></Form.Label>
                        <Form.Control type='date' value={date} onChange={(e) => { setDate(e.target.value) }} />

                    </Form.Group>
                </Form>
            </MyModal>
        </div>
    )
}

export default AddToWallet
