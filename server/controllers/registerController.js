import { userRegisterModel } from "../models/userModel.js";
import { client } from "../index.js";

export const registerHandler = async (req, res) => {
  const { fullName, phone, email } = req.body;

  if (!fullName || !phone || !email) {
    return res.status(500).json({ message: "Please fill all the fields" });
  }

  const isUserExist = await userRegisterModel.findOne({
    $or: [
      { email },
      { phone },
      {
        fullName,
      },
    ],
  });
  if (isUserExist) {
    return res.status(500).json({ message: "User already exists" });
  }
  const verifyCode = Math.floor(100000 + Math.random() * 900000);
  const verifyCodeExpiry = new Date(Date.now() + 20 * 60 * 1000);
  try {
    const response = await userRegisterModel.create({
      fullName,
      phone,
      email,
      verifyCode,
      verifyCodeExpiry,
    });

    if (!response) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    await client.messages.create({
      body: `Your verify code for login is ${verifyCode}`,
      from: "+13343452968",
      to: `+91${phone}`,
    });

    return res.json({
      ...response.toObject(),
      verifyCode: null,
      verifyCodeExpiry: null,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const verifyOtpHandler = async (req, res) => {
  const { otp } = req.body;

  const existingUser = await userRegisterModel.findOne({
    verifyCode: otp,
    verifyCodeExpiry: { $gt: Date.now() },
  });
  if (!existingUser) {
    return res.status(500).json({ message: "Invalid OTP", success: false });
  }

  const user = await userRegisterModel.findByIdAndUpdate(
    existingUser._id,
    {
      $set: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({ user, success: true });
};
