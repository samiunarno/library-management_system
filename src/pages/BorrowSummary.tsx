import React from 'react';
import { useGetBorrowSummaryQuery } from '../store/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BarChart3, BookOpen, Hash, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BorrowSummary: React.FC = () => {
  const { data: summary, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 p-4">Error loading borrow summary</div>;

  const totalBorrowedBooks = summary?.reduce((total, item) => total + item.totalQuantityBorrowed, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Books</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Borrow Summary</h1>
          <p className="text-gray-600 mt-2">Overview of all borrowed books</p>
        </div>
        <div className="bg-indigo-100 px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-600">Total Books Borrowed</p>
          <p className="text-2xl font-bold text-indigo-800">{totalBorrowedBooks}</p>
        </div>
      </div>

      {!summary || summary.length === 0 ? (
        <div className="bg-white rounded-lg shadow-xl p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Borrowed Books Yet</h2>
          <p className="text-gray-600 mb-6">Start borrowing books to see your summary here.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            <span>Browse Books</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-10 w-10 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Borrowing Statistics</h2>
                <p className="text-purple-100">Books currently borrowed from the library</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Borrowed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summary.map((item) => {
                  const percentage = ((item.totalQuantityBorrowed / totalBorrowedBooks) * 100).toFixed(1);
                  return (
                    <tr key={item.bookId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-8 w-8 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">Book ID: {item.bookId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.isbn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Hash className="h-4 w-4 text-gray-500" />
                          <span className="text-lg font-semibold text-gray-900">
                            {item.totalQuantityBorrowed}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12">
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};