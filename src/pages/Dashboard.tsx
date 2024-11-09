import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { TicketCard } from '../components/TicketCard';
import { useTicketStore } from '../store/ticketStore';
import { useAuthStore } from '../store/authStore';

export function Dashboard() {
  const navigate = useNavigate();
  const { tickets, loading, fetchTickets, updateTicket } = useTicketStore();
  const { user, isAdmin } = useAuthStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchTickets();
  }, [isAdmin]);

  const handleStatusChange = async (id: string, status: string) => {
    await updateTicket(id, { status });
  };

  const getStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      highPriority: tickets.filter(t => t.priority === 'high').length,
    };
  };

  const stats = getStats();

  const filteredAndSortedTickets = tickets
    .filter((ticket) => {
      if (filter === 'all') return true;
      return ticket.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - 
               priorityOrder[a.priority as keyof typeof priorityOrder];
      }
      return 0;
    });

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tickets"
          value={stats.total}
          icon={BarChart3}
          color="bg-blue-500"
        />
        <StatCard
          title="Open Tickets"
          value={stats.open}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={CheckCircle}
          color="bg-purple-500"
        />
        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Ticket Management</h2>
          <div className="flex flex-wrap gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Tickets</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isAdmin={true}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {!loading && filteredAndSortedTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No tickets found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}