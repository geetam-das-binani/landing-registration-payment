import { load } from "@cashfreepayments/cashfree-js";
import "./PaymentPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderIdFailure,
  setOrderIdStart,
  setOrderIdSuccess,
} from "../../store/order/order";
import axios from "axios";
import toast from "react-hot-toast";
const PaymentPage = () => {
  let cashfree;
  const { user } = useSelector((state) => state.user);
  const { orderId } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  let initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  initializeSDK();

  const getSessionId = async () => {
    try {
      dispatch(setOrderIdStart());
      const res = await axios.post("http://localhost:3000/api/payment", {
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
      });
      if (res.data && res.data.payment_session_id) {
        dispatch(setOrderIdSuccess(res.data.order_id));

        return res.data.payment_session_id;
      } else {
        throw new Error("Invalid response received from server");
      }
    } catch (error) {
      console.error("Error in getSessionId:", error);
      dispatch(setOrderIdFailure(error.res?.data?.error));
    }
  };
  const verifyPayment = async (orderId) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/verify`, {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        orderId: orderId,
      });
      if (res.data) {
        return true;
      }
    } catch (error) {
      console.error("Error in verifyPayment:", error);
      throw new Error(error.message || "Failed to verify payment");
     
    }
    return false;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const sessionId = await getSessionId();

      const checkOutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };
      cashfree
        .checkout(checkOutOptions)
        .then(() => {
          verifyPayment(orderId);
          toast.promise(verifyPayment(orderId), {
            
            loading: "Verifying payment Please wait ...",
            success: "Payment verified successfully",
            error: "Error in verifying payment",
            
          });
        })
        .catch((error) => {
          console.log(error);
        });

      //  navigate to thanks page
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main-box-container">
      <div className="box-container">
        <h3 className="main-title">Cashfree Payment</h3>
        <img
          className="paymentImage"
          src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="planeimg"
        />
        <p className="payment__info__content">
          Cashfree Payment Gateway accepts domestic and international payments,
          we support a wide range of payment options. You can easily collect
          payments using popular Payment Methods like Cards, UPI, Netbanking,
          Wallets, PayPal, EMI, and Pay Later options.
        </p>

        <button className="payment__button" onClick={handleClick}>
          Pay{" "}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
