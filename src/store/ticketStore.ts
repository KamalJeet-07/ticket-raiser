import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  user_id: string;
  assigned_to?: string;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  fetchTickets: () => Promise<void>;
  createTicket: (ticket: Partial<Ticket>) => Promise<boolean>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  loading: false,
  fetchTickets: async () => {
    set({ loading: true });
    try {
      const { data: tickets, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({ tickets: tickets || [] });
    } catch (error: any) {
      toast.error('Failed to fetch tickets: ' + error.message);
    } finally {
      set({ loading: false });
    }
  },
  createTicket: async (ticket) => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([ticket])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        set((state) => ({ tickets: [data, ...state.tickets] }));
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error('Failed to create ticket: ' + error.message);
      return false;
    }
  },
  updateTicket: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        set((state) => ({
          tickets: state.tickets.map((t) => (t.id === id ? { ...t, ...data } : t)),
        }));
        toast.success('Ticket updated successfully');
      }
    } catch (error: any) {
      toast.error('Failed to update ticket: ' + error.message);
    }
  },
  deleteTicket: async (id) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        tickets: state.tickets.filter((t) => t.id !== id),
      }));
      toast.success('Ticket deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete ticket: ' + error.message);
    }
  },
}));