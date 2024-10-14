import React, { useContext } from 'react'
import { currencyFormatter } from '../utils/formatting'
import Button from './UI/Button'
import CartContext from '../store/CardContext';

const MealItem = ({meal}) => {
  const cartCtx=  useContext(CartContext);

    function handleMealToCart(){
cartCtx.addItem(meal);
    }

  return (
    <div className='meal-item'>
<article>
    <img src={`http://localhost:3000/${meal.image}`}/>
    <h3>{meal.name}</h3>
    <div className='meal-item-description'>
    <p className='meal-item-price'>
    { currencyFormatter.format( meal.price)}</p>
   <p>

   {meal.description}
   </p> 
<div className='meal-item-actions'>
    <button className='button' >
    <Button onClick={handleMealToCart} >

    Add to cart
    </Button>
     </button>

</div>


    </div>
</article>

    </div>
  )
}

export default MealItem