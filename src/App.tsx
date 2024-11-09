import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { NewTicket } from './pages/NewTicket';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useAuthStore } from './store/authStore';

function App() {
  const { checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-ticket" element={<NewTicket />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;