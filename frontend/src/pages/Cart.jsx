import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    backendUrl,
    deliveryFee
  } = useContext(StoreContext);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} >
                <div className="cart-items-title cart-items-item">
                  <img src={backendUrl + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p className="subtotal">Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p className="delivery-fee">Delivery fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b className="total">Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryFee}</b>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promocode, please enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Enter Your Promocode" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
