import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { Link } from "./model/url.model.js";
import urlRoutes from "./routes/url.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortid = req.params.shortId;
  const entry = await Link.findOneAndUpdate(
    { shortId: shortid },
    {
      $push: {
        visitHistory: {
          timestamp: new Date(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }
  console.log("redirecting to url", entry.redirectUrl);

  res.redirect(entry.redirectUrl);
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
