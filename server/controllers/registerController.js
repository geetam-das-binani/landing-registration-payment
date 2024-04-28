import { userRegisterModel } from "../models/userModel.js";

export const registerHandler = async (req,res) => {
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

  try {
    const response = await userRegisterModel.create({
      fullName,
      phone,
      email,
    });
    if (!response) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    return res.json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
