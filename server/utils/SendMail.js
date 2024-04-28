import nodemailer from "nodemailer";

export const sendMail = async (subject, text, userData, orderObj) => {
  const { fullName, email, phone } = userData;
  const { orderAmount, PaidOn, OrderId } = orderObj;
  const htmlContent = `
  <div style="background-color:#fff ; padding: 20px; border: 1px solid rgb(236, 223, 223) ; border-radius: 15px; width: 400px; margin-left:auto; margin-right:auto;">
     <div style="background-color: rgb(110, 34, 231); color: rgb(255, 255, 255); padding: 20px; border-radius: 10px;">
    <h1 style="text-align: center;">Cashfree Payments</h1>
    <span style="font-size: 25px; display: block; text-align: center; margin-top: 20px;">Successful</span>
    <h1 style="text-align: center; margin-top: 5px;">Payment Processed</h1>
    </div>
    <div style="margin-top: 20px;">
    <p>Your payment has been successfully completed. Please find below your transaction details.</p>
    <p>Order ID: ${OrderId}</p> 
    <p>Date: ${PaidOn}</p>
    <p>Amount: ₹${orderAmount}</p>
    <p>Dear ${fullName},</p>
    <h3>Transaction Details:</h3>
    <ul style="list-style-type: none; padding: 0;">
      <li><strong>Name:</strong> ${fullName}</li>
      <li><strong>Email ID:</strong> ${email}</li>
      <li><strong>Mobile No.:</strong> +91${phone}</li>
    </ul>
    <p>Thank you for choosing us.</p>
    <p>Regards,</p>
  </div>
</div>
`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD
    },
  });

  const info = await transporter.sendMail({
    from: process.env.USER,
    to: email,
    subject,
    text,
    html: htmlContent,
  });

  return info.messageId;
};
