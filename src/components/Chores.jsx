import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import "./Groceries.css"
import AddChores from './AddChores';
import {changeStatus,deleteChores, markReminded } from '../store/slices/choresSlice';
import "./Chores.css"

function Chores() {
    const chores = useSelector(state => state.chores.list || []);
    const choresToComplete = chores.filter(ele=>!ele.completed);
    const completedChores = chores.filter(ele=>ele.completed);
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        const interval = setInterval(()=>{
            const now = new Date();
            choresToComplete.forEach(task=>{
                if(task.reminderAt && !task.reminded &&
                    new Date(task.reminderAt) <= now){
                        alert(`⏰ Reminder: ${task.name}`);
                        dispatch(markReminded(task.id));
                }
            })
            
        },60000);
        return ()=>clearInterval(interval);
    },[choresToComplete])

    const showModalHandler = () => {
        setShow(true);
    }
    const onCloseHandler = () => {
        setShow(false);
        setIsEdit(null);
    }
    const statusHandler = (id) => {
        dispatch(changeStatus(id));
    }
    const deleteTaskHandler = (id) => {
        dispatch(deleteChores(id));
    }
    const editTaskHandler = (task) => {
        setIsEdit(task);
        setShow(true);
    }
    return (
        <div className='w-100 h-100 pt-3 m-0 p-3 overflow-y-auto d-flex' >
            <div className='w-75 h-100'>
            <div className='d-flex justify-content-center align-items-center gap-5'>
                <div><h3>Task to be completed!!!</h3></div>
                <Button variant='outline-secondary' onClick={showModalHandler}>Add Task</Button>
                {show && <AddChores show={show}
                    onClose={onCloseHandler}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit} />
                }
            </div>
            <Table>
                <thead>
                    <tr className='p-0 m-0'>
                        <td><strong>List</strong></td>
                        <td><strong>Completed By</strong></td>
                        <td><strong>Note</strong></td>
                        <td><strong>Actions</strong></td></tr>
                </thead>
                <tbody>
                    {choresToComplete.map(ele => {
                        return <tr key={ele.id}>
                            <td>
                                <div>
                                    <p className='d-flex gap-3 mb-0'><i className="bi bi-clock"></i>{ele.name}</p>

                                </div>
                            </td>
                            <td>
                            {ele.date}
                            </td>
                            <td className="align-top note-col">{ele.note}</td>
                            <td className='align-middle'>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={<Tooltip>Mark as complete</Tooltip>}>
                                    <Button className='px-1 py-0 me-1' variant='success' size='sm' onClick={()=>{statusHandler(ele.id)}}><i className='bi bi-check fs-6'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                    placement='top'
                                    overlay={<Tooltip>Edit Chore</Tooltip>}>
                                    <Button variant='link' className='px-1 py-0' size='sm'
                                        onClick={() => { editTaskHandler(ele) }}
                                        disabled={ele.completed}><i className="bi bi-pencil text-dark fs-6"></i> </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger 
                                    placement='top'
                                    overlay={<Tooltip>Delete Chore</Tooltip>}>
                                    <Button variant='link' className='px-1 py-0' size='sm'
                                     onClick={() => { deleteTaskHandler(ele.id) }}><i className="bi bi-trash-fill text-danger fs-5"></i></Button>
                                   </OverlayTrigger>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            </div>
            <div className='w-25 h-100' style={{border:"1px solid gray",backgroundColor:"#8c898963"}}>
                <div><h3>Task History</h3></div>
                <Table>
                    <thead>
                        <tr>
                            <td><strong>Completed</strong></td>
                            <td><strong>On</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                    {completedChores.map(ele=>
                        <tr>
                           <td><p>{ele.name}</p></td> 
                            <td><p>{ele.completed}</p></td>
                        </tr>)}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default Chores
