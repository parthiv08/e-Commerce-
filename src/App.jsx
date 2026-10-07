
import Home from "./components/Home";
import Login from "./components/Login";
import Todoapp from "./components/Todoapp";
import Product from "./components/Product";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import NewProduct from "./components/NewProduct";
import UpdateProduct from "./components/UpdateProduct";
import WishList from "./components/WishList";

if(localStorage.getItem("cart")){
  localStorage.setItem("cart",JSON.stringify([]))
}


// let datafromweb=JSON.parse(localStorage.getItem("cart"))
// localStorage.removeItem("cart")


function App() {
  let user = "parthiv";

  return (
    <div className="app">
      <Router>
        <Header/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />}>
            <Route index element={<ProductList />} />
            <Route path="list" element={<ProductList />} />
            <Route path="details" element={<ProductDetails />} />
          </Route>
          <Route path="/login/:name" element={<Login />} />
          <Route path="/todoapp" element={<Todoapp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newproduct" element={<NewProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/wishlist" element={<WishList/>} />
          <Route path="*" element={<NotFound/> }/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
