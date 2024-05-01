import { useEffect, useState } from "react";
import "./VerifyOtpPage.css";
import toast from "react-hot-toast";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/user/user";
import {useNavigate} from 'react-router-dom'
const VerifyOtpPage = ({ length }) => {
   
    const navigate=useNavigate()
  const [otp, setOtp] = useState([]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const updatedotp = [...otp];
    updatedotp[index] = e.target.value.slice(e.target.value.length - 1);

    setOtp(updatedotp);
    if (e.target.value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const isAllFieldsFilled = otp.filter((i) => i);

    if (isAllFieldsFilled.length < length) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/verify-otp",
        {
          otp: otp.join(""),
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      dispatch(dispatch(registerUser(data.user)));
      toast.success("OTP verified successfully");
      navigate("/payment-page");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (inputRefs?.current[0]) {
      inputRefs?.current[0]?.focus();
    }
  }, []);

  return (
    <div className="otp__container">
      <div className="otp__box">
        <h2>Enter OTP</h2>
        <div className="input__boxes">
          {Array.from({ length }).map((elem, index) => (
            <input
              ref={(elem) => (inputRefs.current[index] = elem)}
              key={index}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleClick(index)}
              type="text"
            />
          ))}
        </div>
        <div className="action">
          {" "}
          <button onClick={handleVerifyOtp} className="otp__button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
