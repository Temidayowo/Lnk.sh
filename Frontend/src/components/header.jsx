import React from "react";
import { Link as LinkIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-3.5 px-14 md:px-40 border-b-[.5px] border-b-gray-700">
      <a href="/">
        <div className="bg-blue-700 inline-flex p-2 rounded">
          <LinkIcon className="text-white" />
        </div>
      </a>
    </header>
  );
};

export default Header;
