import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import RegistrationPage from "./Pages/Registration/RegistrationPage";
import { Toaster } from "react-hot-toast";
import VerifyOtpPage from "./Pages/OtpPage/VerifyOtpPage";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/register-page" element={<RegistrationPage />} />
          <Route path="/verify-otp-page" element={<VerifyOtpPage length={6} />} />

          {user?.isVerified && (
            <Route path="/payment-page" element={<PaymentPage />} />
          ) 
        }
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={{ duration: 4000 }} />
    </>
  );
};

export default App;
