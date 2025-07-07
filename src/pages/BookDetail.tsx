import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../store/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { BookOpen, Tag, Hash, Calendar, Edit, ArrowLeft } from "lucide-react";

export const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookQuery(id!);

  console.log(book);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-600 p-4">Error loading book details</div>;
  if (!book) return <div className="text-gray-600 p-4">Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Books</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-16 w-16 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">{book.title}</h1>
              <p className="text-indigo-100 text-xl mt-2">by {book.author}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Genre</p>
                  <p className="text-lg font-medium">{book.genre}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="text-lg font-medium">{book.isbn}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Copies Available</p>
                  <p className="text-lg font-medium">{book.copies}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Added</p>
                  <p className="text-lg font-medium">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </div>

              {book.description && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <Link
              to={`/edit-book/${book._id}`}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Book</span>
            </Link>

            {book.available && (
              <Link
                to={`/borrow/${book._id}`}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span>Borrow Book</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
