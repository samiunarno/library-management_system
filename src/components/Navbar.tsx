import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Plus, BarChart3 } from "lucide-react";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-[100px] space-x-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <BookOpen className="h-8 w-8 text-indigo-600" /> */}
            <span className="text-2xl font-bold text-gray-800">
              ARmanagement
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive("/")
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>All Books</span>
            </Link>

            <Link
              to="/create-book"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive("/create-book")
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Add Book</span>
            </Link>

            <Link
              to="/borrow-summary"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive("/borrow-summary")
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Borrow Summary</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
