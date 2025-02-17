import React, { useContext, useEffect, useState } from "react";
import "../styles/MyOrders.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";
const MyOrders = () => {
  const { backendUrl, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity+", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={() => fetchData()}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
