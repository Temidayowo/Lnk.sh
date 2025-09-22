import { nanoid } from "nanoid";
import { Link } from "../model/url.model.js";

export const generateAndSendUrl = async (req, res) => {
  const shortId = nanoid(8);
  let { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Ensure the URL has a protocol for proper redirection
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `http://${url}`;
  }

  const foundUrl = await Link.findOne({ redirectUrl: url });

  if (foundUrl) {
    const shortUrl = `${process.env.BACKEND_URL}/${foundUrl.shortId}`;
    return res.json({ shortUrl });
  }

  const newLink = await Link.create({
    shortId: shortId,
    redirectUrl: url,
    visitHistory: [],
  });

  const shortUrl = `${process.env.BACKEND_URL}/${newLink.shortId}`;

  return res.status(201).json({
    shortUrl,
  });
};
