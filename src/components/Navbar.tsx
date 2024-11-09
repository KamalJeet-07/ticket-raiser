import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const { user, signOut, isAdmin } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Ticket className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">TicketHub</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/new-ticket"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  New Ticket
                </Link>
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}