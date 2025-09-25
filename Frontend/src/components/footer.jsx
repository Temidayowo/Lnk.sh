import React from "react";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="w-full py-7 px-4 sm:px-14 md:px-40 border-t-[.5px] border-t-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-sm text-gray-600 font-light">
      <div>&copy; {year} Link Shrink. All rights reserved.</div>
      <div className="flex gap-4">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
