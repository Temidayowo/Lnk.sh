import { useState } from "react";
import InputElement from "./input-element";
import { Clipboard, Copy, WandSparkles, Check, RotateCcw } from "lucide-react";

const Card = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setLongUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      // Optional: Add feedback to the user that copy was successful
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleReset = () => {
    setLongUrl("");
    setShortUrl("");
    setError("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    // --- Form Validation ---
    if (!longUrl) {
      setError("Please enter a URL to shorten.");
      setLoading(false);
      return;
    }

    // Basic URL validation using a regular expression
    // This pattern is more robust and checks for domain, optional port, path, and query params.
    const urlPattern =
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    if (!urlPattern.test(longUrl)) {
      setError("Please enter a valid URL.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/5 border-[.5px] border-gray-600 rounded p-6">
      <div className="text-xl mb-4">Create a New Link</div>
      <form
        className="flex flex-col gap-6 w-full max-w-[500px] m-auto"
        onSubmit={handleSubmit}
      >
        <InputElement
          placeholder="Enter your link to shorten"
          type="text"
          value={longUrl}
          disabled={loading}
          onChange={(e) => setLongUrl(e.target.value)}
        >
          <Clipboard onClick={handlePaste} />
        </InputElement>
        <InputElement
          placeholder="Your shortened link"
          type="text"
          value={shortUrl}
          isReadOnly
          disabled={loading}
        >
          {shortUrl && <Copy onClick={handleCopy} />}
        </InputElement>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !!shortUrl}
            className={`flex flex-row w-full justify-center items-center gap-2 border-0 rounded py-2 text-white transition-colors
            ${
              shortUrl
                ? "bg-green-500 cursor-default"
                : "bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-gray-400 disabled:cursor-not-allowed"
            }`}
          >
            {shortUrl ? <Check size={16} /> : <WandSparkles size={16} />}
            <span>
              {loading ? "Shrinking..." : shortUrl ? "Success!" : "Shrink Link"}
            </span>
          </button>
          {shortUrl && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Card;
// 3b82f6
