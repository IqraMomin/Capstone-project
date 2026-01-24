import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./App.css"
import Mainpage from './components/Mainpage'
import img1 from "./assets/CPBG2.jpg"
import { useDispatch, useSelector} from 'react-redux'
import { fetchRecipes } from './store/slices/recipeSlice'
import { fetchGroceries } from './store/slices/groceriesSlice'
import { fetchChores } from './store/slices/choresSlice'
import { fetchWallet } from './store/slices/walletSlice'


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const email = useSelector(state=>state.auth.email);

  console.log("APP RENDERED");
  console.log("EMAIL FROM STORE:", email);

  useEffect(() => {
    console.log("USEEFFECT RUNNING");
    if (!isLoggedIn) {
      console.log("EMAIL NOT READY — FETCH BLOCKED");
      return;
    }

    console.log("DISPATCHING FETCHES");
    dispatch(fetchRecipes());
    dispatch(fetchGroceries());
    dispatch(fetchChores());
    dispatch(fetchWallet());
  }, [dispatch, isLoggedIn]);

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
