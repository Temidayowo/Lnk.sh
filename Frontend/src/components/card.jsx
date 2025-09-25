import { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardPaste, WandSparkles, Check } from "lucide-react";
import ResponseField from "./responseField";

const Card = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showRespnse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showRespnse) {
      setShowResponse(false);
    }
    if (error) {
      setError(null);
    }
  }, [longUrl]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setLongUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      url: longUrl,
    };

    if (!data.url) {
      setError("URL is required");
      setIsLoading(false);
      return;
    }

    const regExp = new RegExp(/^[a-zA-Z0-9][\s\S]*\.[\s\S]+$/i);
    if (!regExp.test(data.url)) {
      setError("Invalid URL");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://lnk-sh.vercel.app//api/shorten",
        data
      );
      console.log(res.data.shortUrl);
      setShortUrl(res.data.shortUrl);
      setShowResponse(true);
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-3 flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-2xl rounded-lg border border-gray-700">
        <h2 className="p-4 border-b-[.5px] border-b-gray-700 text-xl md:text-2xl font-semibold">
          Create a short link
        </h2>
        <form
          className={`p-4 flex flex-col gap-4 w-full max-w-[500px] mx-auto ${
            error && "gap-8"
          }`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="relative">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL"
              className="w-full p-3 pr-12 rounded-md text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            >
              <ClipboardPaste size={20} />
            </button>
            {error && (
              <p className="text-red-500 text-center absolute right-0 text-xs">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || showRespnse}
            className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm text-white transition-colors disabled:cursor-not-allowed ${
              showRespnse
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
            }`}
          >
            {isLoading ? (
              "Shortening..."
            ) : showRespnse ? (
              <>
                <Check size={20} /> <span>Done</span>
              </>
            ) : (
              <>
                <WandSparkles size={20} /> <span>Shorten</span>
              </>
            )}
          </button>
        </form>
      </div>
      {showRespnse && <ResponseField shortUrl={shortUrl} />}
    </div>
  );
};

export default Card;
