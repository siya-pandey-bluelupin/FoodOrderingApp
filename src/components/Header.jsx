import React, { useContext, useState } from 'react'
import Button from './UI/Button';
import CartContext from '../store/CardContext';
import { UserProgressContext } from '../store/UserProgressContext';

const Header = () => {
    const cartCtx=  useContext(CartContext);
    const userProgressCtx= useContext(UserProgressContext);
    const totalCartItems=cartCtx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems+item.quantity;
    },0)

function handleShowCart(){
    userProgressCtx.showCart()
}
    
    return (
        <header id='main-header'>
            <div id='title'>

                <img src="logo.jpg" />
                <h1 >Foodies</h1>
            </div>
           
           <nav>

           <Button textOnly onClick={handleShowCart}> Cart({totalCartItems})</Button>
           </nav>
        </header>
    )
}

export default Header