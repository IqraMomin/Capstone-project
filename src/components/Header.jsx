import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import "./Header.css"

function Header() {
    return (
        <Navbar className='position-sticky top-0 start-0 p-3' style={{zIndex:"1000"}}>
            <Nav className='d-flex align-items-center gap-3'>
                <Nav.Link className='menu-items' as={NavLink} to="/home">Recipe Book</Nav.Link>
                <Nav.Link className='menu-items' as={NavLink} to="/groceries">Groceries</Nav.Link>
                <Nav.Link className='menu-items' as={NavLink} to="/chores">Chores</Nav.Link>
                <Nav.Link className='menu-items' as={NavLink} to="/wallet">Wallet</Nav.Link>                                
            </Nav>

            
        </Navbar>
    )
}

export default Header
