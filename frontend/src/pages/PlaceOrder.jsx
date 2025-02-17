import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import "../styles/PlaceOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    backendUrl,
    food_list,
    token,
    cartItems,
    deliveryFee
  } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: Number(getTotalCartAmount() + deliveryFee)
    };
    try {
      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        {
          headers: { token }
        }
      );
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  });
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            type="text"
            placeholder="First name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={data.zipcode}
            type="number"
            placeholder="Zipcode"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={data.phone}
          type="number"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
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
            <button type="submit">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
