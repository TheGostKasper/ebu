import { Bell, Menu, User } from "lucide-react";
import useAppStore, { useBreadcrumbStore } from "../store/useAppStore";

const Title = () => {
  const { title } = useBreadcrumbStore();

  return <h1 className="ml-4 text-xl font-semibold text-gray-800">{title}</h1>;
};

const Header = () => {
  const { toggleNav } = useAppStore();
  console.count("Header rendered");

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={toggleNav}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu size={24} />
            </button>
            <Title />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell size={20} />
            </button>
            <button className="ml-3 p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
