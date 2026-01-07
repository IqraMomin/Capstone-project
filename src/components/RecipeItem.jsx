import React from 'react'
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipe } from '../store/slices/recipeSlice';

function RecipeItem({ 
    handleRecipeChange, 
    setActiveRecipeId, 
    activeRecipeId,
    isEdit,
    showModal }) {
    const dispatch = useDispatch();
    const recipeList = useSelector(state => state.recipe.list || []);
    const deleteRecipeHandler = (id) => {
        dispatch(deleteRecipe(id));
        if (activeRecipeId === id) {
            const list = recipeList.filter(ele => ele.id !== id);
            setActiveRecipeId(list.length > 0 ? list[0].id : null);

        }

    }
    const editRecipe = (recipe)=>{
        isEdit(recipe);
        showModal(true);
    }
    return (
        <div className='h-100 w-100'>
            {recipeList.map(ele => {
                return <Card key={ele.id} className='sm m-2 p-0 pt-4' style={{ backgroundColor: "#44310e30" }}>
                    <CardTitle>{ele.name}</CardTitle>
                    <CardBody className='d-flex flex-column'>
                        <div className='d-flex justify-content-center align-items-center my-2'>
                            <Button style={{ backgroundColor: "#705016" }} onClick={() => {
                                handleRecipeChange(ele);
                            }}>
                                View Recipe
                            </Button>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Button className='my-2' style={{ fontSize: "12px", backgroundColor: "#ad7b1eb8" }} onClick={()=>{editRecipe(ele)}}>Edit Recipe</Button>
                            <Button className='my-2' style={{ fontSize: "12px", backgroundColor: "#ad7b1eb8" }} onClick={() => { deleteRecipeHandler(ele.id) }}>Delete Recipe</Button>
                        </div>
                    </CardBody>
                </Card>
            })}
        </div>
    )
}

export default RecipeItem
