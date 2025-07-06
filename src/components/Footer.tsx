import React from "react";
import { BookOpen } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">LibraryHub</span>
            </div>
            <p className="text-gray-400"></p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">
                  All Books
                </a>
              </li>
              <li>
                <a
                  href="/create-book"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Add Book
                </a>
              </li>
              <li>
                <a
                  href="/borrow-summary"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Borrow Summary
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 text-gray-400"></ul>
          </div>

          <div>
            {/* <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Github className="h-6 w-6 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Mail className="h-6 w-6 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors" />
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>CREATED BY SAMIUN ARNO</p>
        </div>
      </div>
    </footer>
  );
};
