import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketCard } from '../components/TicketCard';
import { useTicketStore } from '../store/ticketStore';
import { useAuthStore } from '../store/authStore';

export function Home() {
  const navigate = useNavigate();
  const { tickets, loading, fetchTickets } = useTicketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TicketHub
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sign in to manage your support tickets
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
        >
          Get Started
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Tickets</h1>
        <button
          onClick={() => navigate('/new-ticket')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          Create New Ticket
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => {/* Implement ticket detail view */}}
          />
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No tickets found. Create your first ticket!</p>
        </div>
      )}
    </div>
  );
}