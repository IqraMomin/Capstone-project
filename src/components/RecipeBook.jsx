import React, { useState ,useEffect} from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import RecipePage from './RecipePage'
import RecipeItem from './RecipeItem'
import AddRecipe from './AddRecipe';
import { useSelector } from 'react-redux';

function RecipeBook() {
    const recipeList = useSelector(state => state.recipe.list ||[]);
    const [showModal, setShowModal] = useState(false);
    const [activeRecipeId, setActiveRecipeId] = useState(null);
    const [isEdit,setIsEdit] = useState(null);

    useEffect(()=>{
        if (!Array.isArray(recipeList) || recipeList.length === 0) {
            setActiveRecipeId(null);
            return;
          }
        if(!activeRecipeId && recipeList.length>0){
            setActiveRecipeId(recipeList[0].id);
        }
    },[recipeList,activeRecipeId]);
   
    const handleRecipeChange = (recipeData) => {
        setActiveRecipeId(recipeData.id);
    }
    const closeModalHandler = ()=>{
        setIsEdit(null);
        setShowModal(false);
    }
    const recipeListSafe = recipeList || []
    const activeRecipe = recipeListSafe.find(recipe=>recipe.id===activeRecipeId);

    
    return (
        <Row className='h-100 w-100 g-0'>
            <Col xs={9}>
                <RecipePage activeRecipe={activeRecipe} />
            </Col>
            <Col xs={3}>
                <div className='h-100 d-flex flex-column'>
                    <div style={{ height: "72px" }} className="d-flex align-items-center justify-content-center">
                        <Button onClick={() => { setShowModal(true) }} className='p-2' style={{ backgroundColor: "#ad7b1eb8", border: "0" }}>Add New Recipe</Button>
                        {showModal && <AddRecipe 
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                        show={showModal} 
                        onClose={closeModalHandler} />}

                    </div>
                    <div className="flex-grow-1 overflow-auto">
                        <RecipeItem 
                        showModal={setShowModal}
                        isEdit={setIsEdit}
                        handleRecipeChange={handleRecipeChange} 
                        setActiveRecipeId={setActiveRecipeId}
                        activeRecipeId={activeRecipeId}/>
                    </div>


                </div>

            </Col>

        </Row>
    )
}

export default RecipeBook
