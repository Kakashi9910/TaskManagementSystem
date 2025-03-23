import User from "../model/User.js";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authController = async (req, res) => {
  try {
    const { token } = req.body; // Read token from request body

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    console.log("Received Token:", token); // ✅ Debugging

    // ✅ Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure token matches your app's Client ID
    });

    const payload = ticket.getPayload(); // Decoded user info
    console.log("Verified User:", payload);

    const { email, name, sub } = payload;

    // ✅ Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exists:", user);
      return res.status(200).json({ status: "User already exists", userId: user._id });
    }

    // ✅ Create new user
    user = await User.create({ email, name, googleId: sub });

    console.log("User created successfully:", user);
    return res.status(201).json({ userId: user._id });

  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
