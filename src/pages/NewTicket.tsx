import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export function NewTicket() {
  const navigate = useNavigate();
  const { createTicket } = useTicketStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to create a ticket');
      navigate('/login');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const success = await createTicket({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        priority: formData.get('priority') as 'low' | 'medium' | 'high',
        status: 'open',
        user_id: user.id,
      });

      if (success) {
        toast.success('Ticket created successfully');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Ticket</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Ticket Title
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}