import React, { useState, useEffect } from 'react';
import { commerce} from './lib/commerce';
// import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


//let's import all the components for godsake!!
import { QuantumProducts, QuantumNavbar, Cart, Checkout} from './components';

const App = () => {
    // const [mobileOpen, setMobileOpen] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  console.log(cart);

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart }= await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart }= await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };
       //REFRESHING THE DAMNED CART:)
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };


           //FULLFILLING ORDER....
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();

    } catch (error) {
      //GETTING MEANINGFUL INFORMATION FOR DEBUGGING...
      setErrorMessage(error.data.error.message);
    }
  };


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

//   console.log(cart);





    return (
        // let's wrap to our router
        <Router>
        <div>
    
            <QuantumNavbar totalItems={cart.total_items} />
               {/* switching between componets... */}
                <Switch>
                    <Route exact path="/">
                    <QuantumProducts products={products} onAddToCart={handleAddToCart} />
                    </Route>

                    <Route exact path="/cart">
                    <Cart cart={cart} 
                    handleUpdateCartQty={handleUpdateCartQty} 
                    handleRemoveFromCart={handleRemoveFromCart} 
                    handleEmptyCart={handleEmptyCart} 
                    />
                      </Route>
                      <Route exact path="/checkout" >
                        {/* //passing the cart as a prop */}
                          <Checkout
                           cart ={cart}
                           order={order}
                           onCaptureCheckout={handleCaptureCheckout}
                           error={errorMessage}
                          />
                      </Route>
                </Switch>  
           
           
        </div>
        </Router>
    )
}

export default App;
