// src/controllers/authController.js

const { admin } = require("../firebase/firebaseAdmin"); // Firebase Admin SDK
const User = require("../models/User");
const axios = require("axios");

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: "Missing fields" });

    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ message: "User registered successfully", uid: userRecord.uid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const apiKey = process.env.FIREBASE_API_KEY; // from Firebase project
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      email, password, returnSecureToken: true
    });

    res.json({ token: response.data.idToken, message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: err.response?.data?.error?.message || err.message });
  }
};
