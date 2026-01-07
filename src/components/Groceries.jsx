import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import AddGroceries from './AddGroceries';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, deleteGroceries } from '../store/slices/groceriesSlice';
import { Form } from 'react-bootstrap';
import "./Groceries.css"

function Groceries() {
    const groceries = useSelector(state => state.groceries.list);
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const dispatch = useDispatch();

    const showModalHandler = () => {
        setShow(true);
    }
    const onCloseHandler = () => {
        setShow(false);
        setIsEdit(null);
    }
    const statusHandler = ({ id, status }) => {
        dispatch(changeStatus({ id, status }));
    }
    const deleteGroceriesHandler = (id) => {
        dispatch(deleteGroceries(id));
    }
    const editGroceriesHandler = (groceryItem) => {
        setIsEdit(groceryItem);
        setShow(true);
    }
    return (
        <div className='w-100 h-100 pt-3'>
            <div className='d-flex justify-content-center align-items-center gap-5'>
                <div><h3>Groceries To BUY!!!</h3></div>
                <Button variant='outline-secondary' onClick={showModalHandler}>Add Groceries</Button>
                {show && <AddGroceries show={show}
                    onClose={onCloseHandler}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit} />
                }
            </div>
            <Table>
                <thead>
                    <tr>
                        <td><strong>List</strong></td>
                        <td><strong>Status</strong></td>
                        <td><strong>Note</strong></td>
                        <td><strong>Actions</strong></td></tr>
                </thead>
                <tbody>
                    {groceries.map(ele => {
                        return <tr key={ele.id}>
                            <td>
                                <Form.Check type='checkbox'
                                    checked={ele.completed}
                                    label={ele.name}
                                    value={ele.completed}
                                    className="green-checkbox"
                                    onChange={(e) => {
                                        statusHandler({ id: ele.id, status: e.target.checked })
                                    }} />
                            </td>
                            <td>
                                {ele.completed ? <><i className="bi bi-check-lg text-success fs-4"></i><span>Bought</span></> : "pending"}</td>
                            <td>{ele.note}</td>
                            <td>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Button className='my-2'
                                        style={{ fontSize: "12px", backgroundColor: "#ad7b1eb8" }}
                                        onClick={() => { editGroceriesHandler(ele) }}
                                        disabled={ele.completed}>Edit Recipe</Button>
                                    <Button className='my-2' style={{ fontSize: "12px", backgroundColor: "#ad7b1eb8" }} onClick={() => { deleteGroceriesHandler(ele.id) }}>Delete Recipe</Button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>

        </div>
    )
}

export default Groceries
