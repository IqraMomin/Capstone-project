import React, { useEffect, useState } from 'react'
import MyModal from './UI/MyModal';
import { Form ,Button} from 'react-bootstrap';
import "./AddRecipe.css";
import { addRecipe } from '../store/slices/recipeSlice';
import { useDispatch } from 'react-redux';
import { editRecipe } from '../store/slices/recipeSlice';


function AddRecipe({show,onClose,isEdit,setIsEdit}) {
    const [name,setName] = useState("");
    const [time,setTime] = useState("");
    const [duration,setDuration] = useState("");
    const [ingredient,setIngredient] = useState("");
    const [image,setImage] = useState("");
    const [ingredients,setIngredients] = useState([]);
    const [instructions,setInstructions] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isEdit){
            setName(isEdit.name||"");
        setTime(isEdit.time||"");
        setDuration(isEdit.duration||"");
        setIngredients(isEdit.ingredients||[]);
        setInstructions(isEdit.instructions||"");
        setImage(isEdit.image||"");
        }else{
            resetForm();
        }
    },[isEdit]);

    const handleIngredient = ()=>{
        if(!ingredient.trim()) return;
        setIngredients((prev)=>[...prev,ingredient]);
        setIngredient("");
    }
    const removeIngredient=(index)=>{
        setIngredients((prev)=>{
            return prev.filter((_,i)=>i!==index)
        })
    }
    const resetForm=()=>{
        setName("");
        setTime("");
        setDuration("");
        setIngredients([]);
        setInstructions("");
        setImage("");
    }
    const formSubmitHandler = (e)=>{
        e.preventDefault();
        const data={
            name,time,duration,image,ingredients,instructions
        }
        if(isEdit){
            dispatch(editRecipe({data,id:isEdit.id}))
        }else{
            dispatch(addRecipe(data));
        
        }
       resetForm();
        setIsEdit(null);

    }

    return (
        <MyModal onSave={formSubmitHandler} show={show} onClose={onClose} title="Add New Recipe" saveText={isEdit?"Edit Recipe":"Add Recipe"}>
            <Form>
                <Form.Control className='mt-3' placeholder='Recipe Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <Form.Control className='mt-3' placeholder='Preparation Time' value={time} onChange={(e)=>{setTime(e.target.value)}}/>
                <Form.Control className='mt-3' placeholder='Duration' value={duration} onChange={(e)=>{setDuration(e.target.value)}}/>
                <Form.Control className='mt-3' placeholder='Image URL' value={image} onChange={(e)=>{setImage(e.target.value)}}/>
                <Form.Group controlId='ingredient-list' className='d-flex justify-content-between'>
                <Form.Control className='mt-3'style={{width:"75%"}} placeholder='Add Ingredients' value={ingredient} onChange={(e)=>{setIngredient(e.target.value)}}/>
                <Button className='mt-3' style={{width:"80px",backgroundColor:"#ad7b1eb8"}} onClick={handleIngredient}>Add</Button>
                </Form.Group>
                <ul className="ingredient-list">
  {ingredients.map((item, index) => (
    <li className="ingredient-item" key={index}>
    <span className='text-muted'>{item}</span>
    <Button size="sm" onClick={()=>{removeIngredient(index)}}>x</Button>
  </li>
  ))}
</ul>
                <Form.Control className='mt-3' as="textarea" rows={10} placeholder='How To Prepare - Instructions' value={instructions} onChange={(e)=>{setInstructions(e.target.value)}}/>
            </Form>
        </MyModal>
    )
}

export default AddRecipe
