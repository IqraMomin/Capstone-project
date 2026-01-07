import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./App.css"
import Mainpage from './components/Mainpage'
import img1 from "./assets/CPBG2.jpg"
import { useDispatch} from 'react-redux'
import { fetchRecipes } from './store/slices/recipeSlice'
import { fetchGroceries } from './store/slices/groceriesSlice'


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchRecipes());
    dispatch(fetchGroceries());
  },[])

  return (
    <Container style={{ backgroundColor: "aqua" }} className='vh-100 vw-100 overflow-hidden mb-5' fluid>
      <Row style={{ backgroundColor: "white"}} className='h-100'>
        <Col style={{ backgroundImage:`url(${img1})`}} md={3}>
          
        </Col>
        <Col className='d-flex justify-content-center align-items-center p-0' xs={9} style={{height:"99%"}}>
          <Mainpage/>
        </Col>
      </Row>

    </Container>
  )
}

export default App
