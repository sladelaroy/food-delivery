import React from "react";
import "../styles/Orders.css";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    const status = e.target.value
    try {
      const response = await axios.post(backendUrl+"/api/order/status", {orderId, status})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchAllOrders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street+", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status} id="">
                <option value="Food Processing">Food Processing</option>
                <option value="Out For delivery">Out For delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
