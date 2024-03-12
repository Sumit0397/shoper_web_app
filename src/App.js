import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import CartProvider from "./Context/CartProvider";
import SingleProduct from "./Pages/SingleProduct";
import LoginSignup from "./Pages/LoginSignup/LoginSignup";
import { useContext} from "react";
import AuthContext from "./Context/auth-context";



function App() {

  const authCtx = useContext(AuthContext);




  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/shop/product" element={authCtx.isLoggedin ? <Shop /> : <LoginSignup/>}>
            <Route path="/shop/product/?cat=mens-dress" element={authCtx.isLoggedin ? <Shop /> : <LoginSignup/>} />
            <Route path="/shop/product/?cat=womens-dress" element={authCtx.isLoggedin ? <Shop /> : <LoginSignup/>} />
            <Route path="/shop/product/?cat=kids-dress" element={authCtx.isLoggedin ? <Shop /> : <LoginSignup/>} />
            <Route path="/shop/product/?cat=mens-shoes" element={authCtx.isLoggedin? <Shop /> : <LoginSignup/>} />
            <Route path="/shop/product/?cat=womens-shoes" element={authCtx.isLoggedin ? <Shop /> : <LoginSignup/>} />
            <Route path="/shop/product/?cat=mens-watches" element={authCtx.isLoggedin ? <Shop /> : <LoginSignup/>} />
          </Route>
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/auth" element={<LoginSignup/>} />
          <Route exact path="/singleProduct/:id" element={<SingleProduct/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
