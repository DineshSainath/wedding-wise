const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/budget", require("./routes/budget"));
app.use("/api/vendors", require("./routes/vendors"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Wedding Planner API" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
