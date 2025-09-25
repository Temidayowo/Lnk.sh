import { useState } from "react";
import { Link } from "lucide-react";
import { FaCopy } from "react-icons/fa6";
import { MdLaunch } from "react-icons/md";

const ResponseField = ({ shortUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full max-w-2xl p-0 rounded-lg border bg-blue-100 border-gray-700">
      <h3 className="font-semibold text-xl md:text-2xl p-4 border-b-[.5px] border-b-gray-700 py-4">
        Your Short Link is Ready
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 m-7 p-4 bg-white rounded">
        <div className="flex flex-row gap-4">
          <span className="bg-blue-200 p-2 rounded">
            <Link className="text-blue-800"></Link>
          </span>

          <div>
            <h4 className="text-xs text-gray-600">Short Link </h4>
            <p className="text-sm font-semibold text-blue-500">{shortUrl}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button
            className={`flex items-center bg-blue-600 p-2 rounded-md text-white text-sm font-semibold cursor-pointer ${
              isCopied ? "bg-green-600" : "bg-blue-600"
            }`}
            onClick={() => handleCopy()}
          >
            <FaCopy size={19} className="mr-2 font-light" />
            Copy
          </button>
          <a
            href={`http://${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-200 p-2 rounded-md text-sm font-semibold cursor-pointer"
          >
            <MdLaunch size={19} className="mr-2 font-light" />
            Visit
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResponseField;
