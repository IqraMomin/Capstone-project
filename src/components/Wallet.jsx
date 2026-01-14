import React, { useState } from 'react'
import { Row, Table, Card, Col, Button ,OverlayTrigger,Tooltip} from 'react-bootstrap'
import AddToWallet from './AddToWallet';
import { useSelector } from 'react-redux';
import { deleteFromWallet } from '../store/slices/walletSlice';

function Wallet() {
    const [showModal, setShowModal] = useState(false);
    const transactions = useSelector(state => state.wallet.list || []);
    const [isEdit, setIsEdit] = useState(null);
    const owedToMe = transactions.filter(t => t.type === "lent");
    const iOwe = transactions.filter(t => t.type === "borrowed");
    const totalOwedToMe = owedToMe.reduce((sum,ele)=>{
        return sum+(+ele.amount)
    },0);
    const totalIOwe = iOwe.reduce((sum,ele)=>{
        return sum+(+ele.amount)
    },0);


    const showModalHandler = () => {
        setShowModal(true);
    }
    const closeModalHandler = () => {
        setIsEdit(null);
        setShowModal(false);
    }
    const deleteTaskHandler = (id) => {
        dispatch(deleteFromWallet(id));
    }
    const editTaskHandler = (entry) => {
        setIsEdit(entry);
        setShowModal(true);
    }

    return (
        <div className='w-100 h-100 mx-3 d-flex flex-column gap-4 justify-content-start overflow-auto'>
            <div>
            <Button onClick={showModalHandler}>Record Transaction</Button><br/>
            {showModal && <AddToWallet show={showModal}
                onClose={closeModalHandler}
                isEdit={isEdit}
                setIsEdit={setIsEdit} />}
            </div>
            
                
            <Row className='w-100'>
                {/* People who owe YOU */}
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Header className="text-success fw-bold">
                            Owed to You
                        </Card.Header>
                        <Card.Body>
                            {owedToMe.length === 0 ? (
                                <p>No one owes you money 🎉</p>
                            ) : (
                                <Table size="sm">
                                    <tbody>
                                        {owedToMe.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td className="text-success fw-semibold">
                                                    ₹{item.amount}
                                                </td>
                                                <td className='align-middle'>
                                
                                    <OverlayTrigger
                                    placement='top'
                                    overlay={<Tooltip>Edit Transaction</Tooltip>}>
                                    <Button variant='link' className='px-1 py-0' size='sm'
                                        onClick={() => { editTaskHandler(item) }}
                                        ><i className="bi bi-pencil text-dark fs-6"></i> </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger 
                                    placement='top'
                                    overlay={<Tooltip>Delete Transaction</Tooltip>}>
                                    <Button variant='link' className='px-1 py-0' size='sm'
                                     onClick={() => { deleteTaskHandler(item.id) }}><i className="bi bi-trash-fill text-danger fs-5"></i></Button>
                                   </OverlayTrigger>
                            </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                            <Card.Title><strong>Total Amount:</strong>₹{totalOwedToMe}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

                {/* People YOU owe */}
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Header className="text-danger fw-bold">
                            You Owe
                        </Card.Header>
                        <Card.Body>
                            {iOwe.length === 0 ? (
                                <p>You don’t owe anyone 🎉</p>
                            ) : (
                                <Table size="sm">
                                    <tbody>
                                        {iOwe.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td className="text-danger fw-semibold">
                                                    ₹{item.amount}
                                                </td>
                                                <OverlayTrigger
                                    placement='top'
                                    overlay={<Tooltip>Edit Transaction</Tooltip>}>
                                    <Button variant='link' className='px-1 py-0' size='sm'
                                        onClick={() => { editTaskHandler(item) }}
                                        ><i className="bi bi-pencil text-dark fs-6"></i> </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger 
                                    placement='top'
                                    overlay={<Tooltip>Delete Transaction</Tooltip>}>
                                    <Button variant='link' className='px-1 py-0' size='sm'
                                     onClick={() => { deleteTaskHandler(item.id) }}><i className="bi bi-trash-fill text-danger fs-5"></i></Button>
                                   </OverlayTrigger>
                                            </tr>

                                        ))}
                                    </tbody>
                                </Table>
                            )}
                            
                            <Card.Title><strong>Total Amount:</strong>₹{totalIOwe}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Wallet
