import { useEffect, useState } from "react"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from "./data/db"

function App() {

  // useState

  const [ data, setData ] = useState(db);
  const [cart, setCart ] = useState(() => {
    const saved = localStorage.getItem('cart');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // useEffect

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  // Valores por default

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // Funciones

  function addToCart(item){

    const itemExist = cart.findIndex(searchItem => searchItem.id === item.id );
    
    if( itemExist >= 0 ){ // Ya existe
      const updateCart = [...cart];
      updateCart[itemExist].quantity++
      setCart(updateCart)
    } else{ // no existe
      item.quantity = 1;
      setCart([ ...cart, item ])      
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart);
  }

  function decrementQuantity(id) {
    const updatedCart = cart.map((item) => {
      if(item.id === id && item.quantity > MIN_ITEMS ){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart);
  }

  function clearCart(){
    setCart([]);
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          { data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          )
          )}

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
