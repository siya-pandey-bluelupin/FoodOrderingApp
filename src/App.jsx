import Food from "./components/Meals";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CardContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>

    <CartContextProvider>
   
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
