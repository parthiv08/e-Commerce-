import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Atom } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch,useSelector}from "react-redux"
import {addItem}from "../store/cartSlice"




const ProductList = () => {
  let navigate = useNavigate();

  let { products, error, pending,setProducts } = useFetch("http://localhost:5000/products");

  let handleDelete=(id)=>{
    console.log(id);
    axios.delete(`http://localhost:5000/products/${id}`)
    
    
    .then(()=>{
      alert("deleted successfully")
      let newProductlist =products.filter(products=>products.id !==id)
      setProducts(newProductlist)
    })

  }
  let dispatch=useDispatch()
  let cartState=useSelector((state)=>{return state.cart})

  let addItemToCart=(product)=>{

    let checkProduct= cartState.some(cartprduct=>cartprduct.id===product.id)



    if(!checkProduct){
      dispatch(addItem(product))


    }
    else{
      alert("product already added")
    }


    
  }

  if (pending) {
    return (
      <div>
        <Atom color="#32cd32" size="medium" text="Loading" textColor="" />
      </div>
    );
  } else {
    return (
      <div>
        <article>
          <span>To Create New Product</span>
          <Button onClick={()=>{navigate("/newProduct")}}> Click me!</Button>
        </article>
        <h1>Product List</h1>
        {products.length !== 0 && (
          <section className="products">
            {products.map((product) => (
              <Card
                key={product.id}
                style={{ width: "18rem" }}
                className="product"
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "9rem", height: "12rem" }}
                  />
                </center>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button variant="primary" onClick={()=>addItemToCart(product)}>
                    <MdOutlineAddShoppingCart />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigate(`/update/${product.id}`);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={()=>{handleDelete(product.id)}}>
                    <MdDelete />
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </section>
        )}

        {error && <p>{error}</p>}
      </div>
    );
  }
};

export default ProductList;
