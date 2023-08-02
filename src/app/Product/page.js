"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, increment, decrement } from "src/app/Store/registerslice.js";
import { Card, Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Link from "next/link";

function Productpage() {
  const currentUser = useSelector((state) => state.signup.currentUser);
  const cartItemsFromRedux = useSelector((state) => state.signup.cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((result) => setItems(result));
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userCartItems = cartItemsFromRedux.filter(
        (item) => item.userid === currentUser.id
      );
      setCartItems(userCartItems);
    }
  }, [currentUser, cartItemsFromRedux]);

  const addtocart = (product) => {
    if (currentUser) {
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        dispatch(increment(existingItem.id));
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        dispatch(addCart({ userid: currentUser.id, product }));
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const incrementquantity = (id) => {
    dispatch(increment(id));
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementquantity = (id) => {
    dispatch(decrement(id));
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const cards = items.slice(0, 20).map((product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    return (
      <div className="col-lg-3 mt-3" key={product.id}>
        <Card className="h-100">
          <Card.Body>
            <div className="text-center">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ width: "90px", height: "150px" }}
              />
            </div>
            <div className="text-center mt-3">
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>INR: {product.price}</Card.Text>
            </div>
          </Card.Body>
          {cartItem ? (
            <Card.Footer className="text-center">
              <div>
                <button
                  className="btn btn-primary px-3 py-1"
                  onClick={() => decrementquantity(cartItem.id)}
                >
                  <AiOutlineMinus />
                </button>
                <span className="m-3">{cartItem.quantity}</span>
                <button
                  className="btn btn-primary px-3 py-1"
                  onClick={() => incrementquantity(cartItem.id)}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </Card.Footer>
          ) : (
            <Card.Footer className="text-center">
              <Button
                variant="primary"
                className="text-center"
                onClick={() => addtocart(product)}
              >
                Add to Cart
              </Button>
            </Card.Footer>
          )}
        </Card>
      </div>
    );
  });

  return (
    <>
      <div>Product Dashboard</div>

      <div className="cards-container" style={{ overflowX: "hidden" }}>
        <div className="row">{cards}</div>
      </div>
    </>
  );
}

export default Productpage;
