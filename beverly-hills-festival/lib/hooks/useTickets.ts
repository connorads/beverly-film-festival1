'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { Ticket } from '@/lib/types';

interface TicketsState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
}

export function useTickets() {
  const [state, setState] = useState<TicketsState>({
    tickets: [],
    isLoading: true,
    error: null,
  });

  const fetchTickets = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.tickets.list();
    
    if (response.ok && response.data) {
      setState({
        tickets: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        tickets: [],
        isLoading: false,
        error: response.error?.message || 'Failed to fetch tickets',
      });
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const purchaseTickets = useCallback(async (data: {
    screeningId: string;
    quantity: number;
    seatNumbers?: string[];
  }) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.tickets.purchase(data);
    
    if (response.ok && response.data) {
      // Add new tickets to the list
      setState(prev => ({
        tickets: [...prev.tickets, ...response.data!],
        isLoading: false,
        error: null,
      }));
      return response.data;
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error?.message || 'Failed to purchase tickets',
      }));
      throw new Error(response.error?.message || 'Failed to purchase tickets');
    }
  }, []);

  return {
    ...state,
    refetch: fetchTickets,
    purchaseTickets,
  };
}

interface UseTicketOptions {
  id?: string;
  autoFetch?: boolean;
}

interface TicketState {
  ticket: Ticket | null;
  isLoading: boolean;
  error: string | null;
}

export function useTicket(options: UseTicketOptions = {}) {
  const { id, autoFetch = true } = options;
  const [state, setState] = useState<TicketState>({
    ticket: null,
    isLoading: autoFetch && !!id,
    error: null,
  });

  const fetchTicket = useCallback(async (ticketId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.tickets.get(ticketId);
    
    if (response.ok && response.data) {
      setState({
        ticket: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        ticket: null,
        isLoading: false,
        error: response.error?.message || 'Failed to fetch ticket',
      });
    }
  }, []);

  useEffect(() => {
    if (autoFetch && id) {
      fetchTicket(id);
    }
  }, [autoFetch, id, fetchTicket]);

  return {
    ...state,
    fetchTicket,
  };
}

// Hook for generating QR codes for tickets
export function useTicketQRCode(ticketId: string) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (ticketId) {
      // Generate QR code URL
      const qrData = encodeURIComponent(JSON.stringify({
        ticketId,
        timestamp: Date.now(),
      }));
      
      // Using a public QR code API for simplicity
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
      setQrCodeUrl(qrUrl);
    }
  }, [ticketId]);

  return qrCodeUrl;
}