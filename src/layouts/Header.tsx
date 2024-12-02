import { Bell, LogOut, User } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../Auth/store";
import { useBreadcrumbStore } from "../store/useAppStore";

const Title = () => {
  const { title } = useBreadcrumbStore();

  return <h1 className="ml-4 text-xl font-semibold text-gray-800">{title}</h1>;
};

const Header = () => {
  const { user, logout } = useAuthStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Title />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell size={20} />
            </button>
            <div className="relative ml-3">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <User size={20} />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut size={16} className="inline-block mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
