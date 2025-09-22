const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="absolute bottom-0 w-full h-32 bg-white px-24 flex justify-between items-center font-normal text-xs text-[#374151] border-t-[.5px] border-t-{#f9fafb}">
      <p>&copy; {year} Link Share. All rights reserved.</p>
      <div className="flex gap-4">
        <p className="cursor-pointer">Privacy Policy</p>
        <p className="cursor-pointer">Terms of Service</p>
      </div>
    </div>
  );
};

export default Footer;
