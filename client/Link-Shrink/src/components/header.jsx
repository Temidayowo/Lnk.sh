import { Link } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full px-24 flex justify-start items-center py-4 gap-4 border-b-[.5px] border-b-{#f9fafb}">
      <div className="bg-[#2563eb] p-2 rounded">
        <Link className="text-white text-xl font-bold" />
      </div>
      <h1 className="text-[#111827] text-2xl font-bold">Link Share</h1>
    </div>
  );
};

export default Header;
