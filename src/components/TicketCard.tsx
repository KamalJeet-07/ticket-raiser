import React from 'react';
import { Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    created_at: string;
  };
  onStatusChange?: (id: string, status: string) => void;
  isAdmin?: boolean;
}

export function TicketCard({ ticket, onStatusChange, isAdmin }: TicketCardProps) {
  const statusOptions = ['open', 'in_progress', 'resolved', 'closed'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{ticket.title}</h3>
        <div className="flex flex-col gap-2 ml-4">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <time>{new Date(ticket.created_at).toLocaleString()}</time>
        </div>
        
        {isAdmin && onStatusChange && (
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
            className="text-sm border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}