"use client";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import { Button, Card } from "react-bootstrap";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  removecart,
  increment,
  decrement,
} from "src/app/Store/registerslice.js";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

function Cart(props) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [storedata, setStoredata] = useState([]);
  const loggedInUser = useSelector((state) => state.signup.currentUser);

  console.log("cartItems", cartItems);
  // const proceedtobuy=()=>{
  //   if(!loggedInUser || !registeredUsers){
  //   router.push('/login')}
  // else{
  //   router.push('/')
  // }
  //}
  const subtotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += Math.trunc(item.price) * item.quantity || 0;
    });
    return total;
  };

  const mycart = useSelector((state) => state.signup.cart);

  console.log("mycart", mycart);

  useEffect(() => {
    if (!loggedInUser) {
    } else {
      mycart.map((d) => {
        console.log("mycart.userid", d?.userid);
        console.log("loggedInUserd.id", loggedInUser.id);
        if (d?.userid === loggedInUser.id) {
          const carts = mycart.filter(
            (item) => item?.userid === loggedInUser.id
          );
          setCartItems(carts);
          //  dispatch(updatecart(carts))
          console.log("idsofcartcheckmap", carts);
        }
      });
    }
  }, []);
  console.log("cartItems", cartItems);

  const removeProductFromCart = (id) => {
    dispatch(removecart(id));
    setCartItems(cartItems.filter((item) => item.id !== id));
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
  return (
    <>
      {console.log("cartitemcartpage", cartItems)}

      {cartItems.length === 0 ? (
        <>
          <div className="modal-body">
            <h5>Ohooo!</h5>
            <p>
              This cart is empty please go through this button{" "}
              <a
                href="/Homepage"
                role="button"
                className="btn btn-secondary popover-test"
                title="Popover title"
                data-bs-content="Popover body content is set in this attribute."
                style={{ width: "200px" }}
              >
                Shop Now
              </a>
            </p>
            <hr />
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <br />
            {cartItems?.map((d) => {
              return (
                <>
                  <Card key={d.id} className="h-100 m-1 cards border-0">
                    <div className="row">
                      <div className="col-lg-2 col-xl-2 col-sm-12">
                        <div className="text-center my-2">
                          <Card.Img
                            variant="top"
                            src={d.image}
                            className="m-1"
                            style={{ height: "130px", width: "100px" }}
                          />
                        </div>{" "}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6 col-12">
                        <Card.Body>
                          <Card.Title>{d.title}</Card.Title>
                          <Card.Text>INR:{d.price}</Card.Text>
                          <Card.Text>
                            <p>
                              <b>Total:</b> {d.price * d.quantity}
                            </p>
                          </Card.Text>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                              <button className="btn btn-primary px-1 py-1 ">
                                <AiOutlinePlus
                                  onClick={() => incrementquantity(d.id)}
                                />
                              </button>
                              <span className="m-2">{d.quantity}</span>
                              <button className="btn btn-primary px-1 py-1 ">
                                {" "}
                                <AiOutlineMinus
                                  onClick={() => decrementquantity(d.id)}
                                />
                              </button>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-12">
                              <Button
                                variant="primary"
                                className=""
                                onClick={() => removeProductFromCart(d.id)}
                              >
                                remove
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </div>
                    </div>
                  </Card>

                  <hr />
                </>
              );
            })}
            {/* </>):""}  */}
            {cartItems.length > 0 && (
              <>
                {/* <button
            className="btn btn-warning rounded-pill"
            onClick={proceedtobuy}
          >
            Proceed to Buy{" "}
          </button> */}
                <h2 className="pe-5 text-end">
                  Subtotal:{subtotal()}.00 <sup> ₹</sup>{" "}
                </h2>
              </>
            )}
          </div>
        </>
      )}

      {/* <Button
                        variant="primary"
                        className="text-center"
                        onClick={() => proceedtobuy()}
                      >
                        Buy product
                      </Button> */}
    </>
  );
}

export default Cart;
