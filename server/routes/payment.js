import express from 'express'
import { payment,verifyPayment } from '../controllers/paymentControllers.js'

const router = express.Router()
router.post('/payment',payment)
router.post('/verify',verifyPayment)


  
  
//   app.get("/payment", async (req, res) => {
//     try {
//       let request = {
//         order_id: await generateOrderId(),
//         order_amount: 10.34,
//         order_currency: "INR",
//         customer_details: {
//           customer_id: crypto.randomBytes(16).toString("hex"),
//           customer_email: "geetambinani6@gmail.com",
//           customer_phone: "9999999996",
//           customer_name: "geetam",
//         },
//       };
  
//       const response = await Cashfree.PGCreateOrder("2023-08-01", request);
//       return res.json(response.data);
//     } catch (error) {
//       res.status(500).send(error.response.data.message);
//     }
//   });
//   app.post("/verify/payment/:orderId", async (req, res) => {
//     if (!req.params.orderId) {
//       return res.status(500).json({ message: "Order Id is empty or undefined" });
//     }
//     const { username, email, phone } = req.body;
//     if (!username || !email || !phone) {
//       return res.status(500).json({ message: "User Data is empty" });
//     }
//     const userData = {
//       username,
//       email,
//       phone,
//     };
  
//     try {
//       const response = await Cashfree.PGOrderFetchPayments(
//         "2023-08-01",
//         req.params.orderId
//       );
//       await sendMail(
//         "Successful Payment",
//         "Congratulations on your payment!",
//         userData
//       );
//       return res.json(response.data);
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   });
export default router