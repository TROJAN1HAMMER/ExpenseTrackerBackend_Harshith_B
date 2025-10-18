// src/server.js
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌", err.message);
  });
