import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { Link } from "./model/url.model.js";
import urlRoutes from "./routes/url.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend development server
    methods: ["GET", "POST"], // Allow the necessary HTTP methods
  })
);

app.use("/api", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortid = req.params.shortId;

  try {
    const entry = await Link.findOne({ shortId: shortid });

    if (!entry || !entry.redirectUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Perform the redirect immediately
    res.redirect(entry.redirectUrl);

    // Then, update the visit history asynchronously
    await Link.updateOne(
      { shortId: shortid },
      { $push: { visitHistory: { timestamp: new Date() } } }
    );
  } catch (error) {
    console.error("Redirection error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
