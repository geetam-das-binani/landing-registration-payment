import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  registerUserStart,
  registerUserFail,
} from "../../store/user/user";
import "./RegistrationPage.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import be10x from "../../images/be10x.png";
import datasafe from "../../images/datasafe.png";
import guaranty from "../../images/guaranty.png";
import privacy from "../../images/privacy.png";
import india from "../../images/india.webp";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
const RegistrationPage = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.fullName || !userInfo.email || !userInfo.phone) {
      alert("Please fill all the fields");
      return;
    }
    try {
      dispatch(registerUserStart());
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(registerUserFail(data.message));
        return;
      }
      dispatch(registerUser(data));
      navigate("/payment-page");
    } catch (error) {
      dispatch(registerUserFail(error.message));
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error, dispatch]);
  return (
    <div>
      <div className="heading">
        <h1>CONGRATS! YOU ARE JUST ONE STEP AWAY FROM MASTERING AI TOOLS</h1>
      </div>
      <div className="details">
        <h2>Anyone from any field can attend this workshop.</h2>
        <h1>
          Simply Pay <span>₹ 9 + GST</span> and Get Started
        </h1>
      </div>
      <div className="form__div">
        <div className="form__top__div">
          <div className="form__be">
            <img className="be__10" src={be10x} alt="be10x" />
          </div>
          <div className="form__title">
            <p>AI TOOLS WORKSHOP</p>
          </div>
          <div className="form__price">
            <span>₹9.07</span>
            <span>₹929</span>
          </div>
          <div className="form__gst">+ GST</div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__inputs">
            <label>
              Full Name: <span>*</span>
              <Input
                value={userInfo.fullName}
                onChange={handleInputChange}
                placeholder="Your Name"
                type="text"
                name="fullName"
              />
            </label>
            <label>
              Email Address: <span>*</span>
              <Input
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="example@example.com"
                type="email"
                name="email"
              />
            </label>{" "}
            <label>
              Mobile Number (WhatsApp Number) <span>*</span>
              <div className="mobile__div__image__container">
                <img src={india} alt="Indian flag" className="india" />


                <Input
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="XXXXXXXXXX"
                  type="number"
                  name="phone"
                  className="mobile__input"
                />
              </div>
            </label>
          </div>

          <p>
            You will get updates on your Whatsapp{" "}
            <IoLogoWhatsapp className="whatsapp__icon" />
          </p>
          <button disabled={loading} className="register__btn">
            Next
          </button>
          <h5 className="terms">
            By proceeding you agree to our <span>Terms</span>,
            <span>Privacy</span> & <span>Refund Policy</span>
          </h5>
        </form>
      </div>
      <h1 className="bonus__title">
        Also, register before the deadline to unlock Bonuses worth ₹ 10,500!
      </h1>
      <div className="cards">
        <Card
          title={"Bonus 1"}
          text1={"50+ easy to implement "}
          text2={"productivity hacks"}
          value={"Value: ₹ 5,000"}
        />

        <Card
          title={"Bonus 2"}
          text1={"800+ Premium Customizable "}
          text2={"PPT templates"}
          value={"Value: ₹ 3,000"}
        />

        <Card
          title={"Bonus 3"}
          text1={"Ebook on Time Management"}
          value={"Value: ₹ 2,500"}
        />
      </div>
      <p className="certificate">
        By the end of this 3-hour certified AI Tools workshop, you will also get
        a completion certificate by Be10X.
      </p>

      <div className="supports">
        <div>
          <img src={datasafe} alt="datasafe" />
          <p>Your Data is Safe With Us</p>
        </div>
        <div>
          <img src={privacy} alt="privacy" />
          <p>We Protect Your Privacy</p>
        </div>
        <div>
          <img src={guaranty} alt="guaranty" />
          <p>100% Satisfaction Guaranteed</p>
        </div>
        <div className="ssl__data__div">
          <img
            className="ssl__image"
            src="https://pay.be10x.in/security-public-1.webp"
            alt="ssl"
          />
          <div>
            <p className="transaction">100% Secure Transaction.</p>
            <p className="orders">
              All orders are through Razorpay, a very secure network. Your
              credit card information is never stored in any way. We respect
              your privacy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
