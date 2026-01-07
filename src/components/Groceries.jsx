import React,{useState} from 'react'
import { Button, Table } from 'react-bootstrap'
import AddGroceries from './AddGroceries';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '../store/slices/groceriesSlice';
import { Form } from 'react-bootstrap';

function Groceries() {
    const groceries = useSelector(state=>state.groceries.list);
    const [show,setShow] = useState(false);
    const [isEdit,setIsEdit] = useState(null);
    const dispatch = useDispatch();

    const showModalHandler = ()=>{
        setShow(true);
    }

    const statusHandler = (id)=>{
        dispatch(changeStatus(id));
    }

    return (
        <div className='w-100 h-100 bg-info pt-3'>
            <div className='d-flex justify-content-center align-items-center gap-5'>
                <div><h3>Groceries To BUY!!!</h3></div>
                <Button variant='outline-secondary' onClick={showModalHandler}>Add Groceries</Button>
                {show && <AddGroceries show={show} 
                onClose={()=>{setShow(false)}}
                isEdit={isEdit}/>}
            </div>
            <Table>
                <tbody>               
            {groceries.map(ele=>{
                return <tr key={ele.id}>
                    <td>{ele.name}</td>
                    <td>
                        {ele.status ==="pending" ? "pending" : <Form.Check
      type="checkbox"
      label="Bought"
      defaultChecked
      className="text-success"
    />}</td>
                    <td><Button variant='success' disabled={ele.status!=="pending"} onClick={()=>{statusHandler(ele.id)}}>Bought?</Button></td>
                    <td>{ele.note}</td>
                    <td>
                        <div className='d-flex gap-3'>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
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
