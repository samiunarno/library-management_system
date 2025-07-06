import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useGetBookQuery, useBorrowBookMutation } from '../store/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BookOpen, Calendar, Hash, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const BorrowBook: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isLoadingBook } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({
        bookId: bookId!,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();
      toast.success('Book borrowed successfully');
      navigate('/borrow-summary');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to borrow book');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
  };

  if (isLoadingBook) return <LoadingSpinner />;
  if (!book) return <div className="text-gray-600 p-4">Book not found</div>;

  // Get tomorrow's date as minimum due date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-12 w-12 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Borrow Book</h1>
              <p className="text-green-100 mt-1">Fill in the borrowing details</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-10 w-10 text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Available copies: <span className="font-semibold">{book.copies}</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="h-4 w-4 inline mr-1" />
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                max={book.copies}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter quantity to borrow"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum {book.copies} copies available
              </p>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={minDate}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <p className="text-sm text-gray-500 mt-1">
                Select when you plan to return the book
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isBorrowing || !book.available}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <BookOpen className="h-5 w-5" />
                <span>{isBorrowing ? 'Borrowing...' : 'Borrow Book'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};