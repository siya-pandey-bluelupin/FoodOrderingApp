import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CardContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
const apiUrl = import.meta.env.VITE_API_URL;

const requestConfig={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
};
export default function Checkout (){
  const cartCtx=  useContext(CartContext);
  const userProgressCtx=useContext(UserProgressContext);
 
 const {data,
     isLoading:isSending,
     error,
     sendRequest,
     clearData
    }= useHttp(`${apiUrl}/orders`,requestConfig)
 
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

  function handleClose(){
    console.log("Close from Checkout ");
    userProgressCtx.hideCheckout();
  }


  function handleFinish(){
    userProgressCtx.hideCheckout();
cartCtx.clearCart();
clearData();
  }
  function handleSubmit (event){
    event.preventDefault();
    new FormData(event.target);
    const fd=new FormData(event.target);
    const customerData=Object.fromEntries(fd.entries());//email:test@example.com
   sendRequest(JSON.stringify({
    order:{
        items:cartCtx.items,
        customer:customerData
    }
}))
   
   
  }
  

  let actions=(<>
<Button textOnly type="button" onClick={handleClose}>Close</Button>
<Button >Submit Order</Button>
  </>)

  if (isSending){
    actions=<span>Sending Order data...</span>;
  }
  if (data && !error ){
   return <Modal  open={userProgressCtx.progress ==='checkout'} onClose={handleFinish}>
<h2>Success !</h2>
<p>Your order was submitted successfully.</p>
<p> We will get back to you with more details via email within few minutes</p>
<p className="modal-actions">
<Button onClick={handleFinish}>Okay</Button>
</p>
    </Modal>
  }
    return (
        <Modal open={userProgressCtx.progress ===
        "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount :{currencyFormatter.format(cartTotal)} </p>

                <Input label="Full Name " type="text" id="name"/>
                <Input label="E-mail Address"  type="email"id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code " type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>
                {error && <ErrorPage title="Failed to submit order " message={error}/>}
            <p className="modal-actions">
                {actions}
            </p>
            </form>
        </Modal>
    )
}