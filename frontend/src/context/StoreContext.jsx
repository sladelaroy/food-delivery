import { createContext, useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_List] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/food/list");
      if (response.data.success) {
        setFood_List(response.data.data);
        console.log(food_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(backendUrl+"/api/cart/get", {}, {headers: {token}}) 
      if (response.data.success) {
        setCartItems(response.data.cartData)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  },[]);
  const contextValue = {
    food_list,
    removeFromCart,
    addToCart,
    setCartItems,
    cartItems,
    getTotalCartAmount,
    backendUrl,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
