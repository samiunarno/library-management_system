import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/Layout';
import { BookList } from './pages/BookList';
import { BookDetail } from './pages/BookDetail';
import { CreateBook } from './pages/CreateBook';
import { EditBook } from './pages/EditBook';
import { BorrowBook } from './pages/BorrowBook';
import { BorrowSummary } from './pages/BorrowSummary';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<BookList />} />
              <Route path="books/:id" element={<BookDetail />} />
              <Route path="create-book" element={<CreateBook />} />
              <Route path="edit-book/:id" element={<EditBook />} />
              <Route path="borrow/:bookId" element={<BorrowBook />} />
              <Route path="borrow-summary" element={<BorrowSummary />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;