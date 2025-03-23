import User from "../model/User.js";

export const authController = async (req, res) => {
  try {
    // console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
        console.log('farfa',user)

      res.status(200).send({ "status": "user already exist", "userId":user._id });
      return;
    }
    const userData = await User.create(req.body);
    console.log("user created successfully");
    res.status(201).send({ "userId": userData._id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


