import React, { useEffect } from "react";
import "../styles/Verify.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { backendUrl } from "../App.jsx";
import axios from 'axios'
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate  = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      const response = await axios.post(backendUrl+"/api/order/verify", {success, orderId})
       if (response.data.success) {
        navigate("/myorders")
       } else {
        navigate("/")
       }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  console.log(success, orderId);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
