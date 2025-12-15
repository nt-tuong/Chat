import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";

interface SidebarHeaderProps {
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SidebarHeader = ({ onSearchChange }: SidebarHeaderProps) => {
  const navigate = useNavigate();
  const handleClickIcon = () => {
    navigate("/");
  }

  const handleClickMenu = () => {
    console.log("onClickMenu");
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e);
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={handleClickIcon}>Chat With Me</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleClickMenu}>
          <Menu size={20} className="text-gray-600" />
        </button>
      </div>
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChangeSearch}
        />
      </div>
    </div>
  );
};

export default SidebarHeader;