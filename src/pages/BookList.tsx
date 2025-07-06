import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '../store/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Edit, Trash2, BookOpen, Plus, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export const BookList: React.FC = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; bookId: string; title: string }>({
    isOpen: false,
    bookId: '',
    title: '',
  });

  const handleDelete = async () => {
    try {
      await deleteBook(deleteDialog.bookId).unwrap();
      toast.success('Book deleted successfully');
      setDeleteDialog({ isOpen: false, bookId: '', title: '' });
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 p-4">Error loading books</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library Collection</h1>
          <p className="text-gray-600 mt-2">Manage your books and track availability</p>
        </div>
        <Link
          to="/create-book"
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Book</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books?.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-10 w-10 text-indigo-600" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">by {book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {book.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.copies}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      book.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      to={`/books/${book._id}`}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                    >
                      <Eye className="h-4 w-4 inline" />
                    </Link>
                    <Link
                      to={`/edit-book/${book._id}`}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="h-4 w-4 inline" />
                    </Link>
                    <button
                      onClick={() => setDeleteDialog({ isOpen: true, bookId: book._id, title: book.title })}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                    {book.available && (
                      <Link
                        to={`/borrow/${book._id}`}
                        className="text-green-600 hover:text-green-900 transition-colors ml-2"
                      >
                        <BookOpen className="h-4 w-4 inline" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, bookId: '', title: '' })}
        onConfirm={handleDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${deleteDialog.title}"? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
};