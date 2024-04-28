import { sendMail } from "../utils/SendMail.js";
import crypto from "crypto";
import { Cashfree } from "cashfree-pg";
import dotenv from "dotenv";
dotenv.config();

// Ensure environment variables are set
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.error(
    "CLIENT_ID or CLIENT_SECRET environment variables are not set."
  );
  process.exit(1); // Exit process if environment variables are missing
}

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

async function generateOrderId() {
  try {
    const uniqueId = crypto.randomBytes(16).toString("hex");

    const hash = crypto.createHash("sha256");
    hash.update(uniqueId);

    const orderId = hash.digest("hex");
    return orderId.substring(0, 12);
  } catch (error) {
    console.error("Error generating order ID:", error);
  }
}
export const payment = async (req, res) => {
  const { email, phone, fullName } = req.body;

  if (!email || !phone || !fullName) {
    return res.status(500).json({ message: "Please fill all the fields" });
  }
  try {
    let request = {
      order_amount: 1.00,
      order_currency: "INR",
      order_id: await generateOrderId(),
      customer_details: {
        customer_id: crypto.randomBytes(16).toString("hex"),
        customer_phone: `${phone}`,
        customer_name: `${fullName}`,
        customer_email: `${email}`,
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during payment");
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { fullName, email, phone, orderId } = req.body;
   
    if (!orderId) {
      return res
        .status(500)
        .json({ message: "Order Id is empty or undefined" });
    }
    if (!fullName || !email || !phone) {
      return res.status(500).json({ message: "User Data is empty" });
    }
    const userData = {
      fullName,
      email,
      phone,
    };

    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    
    const orderObj = {
      orderAmount: response.data[0]?.payment_amount,
      PaidOn: new Date(response.data[0]?.payment_completion_time).toDateString(),
      OrderId: response.data[0]?.order_id,
    };

    await sendMail(
      "Successful Payment",
      "Congratulations! Your payment has been made successfully.",
      userData,
      orderObj
    );
   
    res.json(response.data);
  } catch (error) {
    console.error("Error during verification:", error);

    if (error.response && error.response.data && error.response.data.message) {
      return res.status(500).send(error.response.data.message);
    }

    res.status(500).send(error.message);
  }
};







