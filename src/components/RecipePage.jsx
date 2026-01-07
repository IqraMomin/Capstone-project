import React from 'react'
import { Col, Row } from 'react-bootstrap'

function RecipePage({activeRecipe}) {
    if (!activeRecipe) {
        return <p>Please select a recipe</p>;
      }

    return (
        <div className='h-100' style={{ backgroundColor: "antiquewhite"}}>       
        <Row className='w-100 g-0 overflow-y-auto' style={{paddingLeft:"2rem",paddingRight:"1rem",boxSizing:"border-box"}}>
            <Col xs={12} className='d-flex justify-content-between'>
                
                <div className='d-flex flex-column align-items-start' style={{marginTop:"2rem"}}>
                    <h2>{activeRecipe.name} </h2>
                    <br/>
                    <p><strong>Preparatime Time: </strong> {activeRecipe.time}</p>
                    <p><strong>Duration:</strong>{activeRecipe.duration}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul className='d-flex flex-column align-items-start'>
                        {activeRecipe.ingredients?.map((ele,index)=>{
                            return <li key={index}>{ele}</li>
                        })}
                        
                    </ul>
                </div>
                <div style={{ height:"300px",paddingTop:"2rem"}}>
                    <img width="250px" height="250px" src={activeRecipe.image} alt='Food 1' />
                </div>
            </Col>
            <Col xs={12} className=''>
                <div className='d-flex flex-column  align-items-start' style={{ textAlign: "left"}}>
                <p><strong>How to prepare:</strong></p>
                <p>{activeRecipe.instructions} </p>
               
                </div>
                 
            </Col>
        </Row>
        </div>
    )
}

export default RecipePage
