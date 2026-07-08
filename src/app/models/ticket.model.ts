export type TicketStatus = 'open' | 'in-progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  id?: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assigneeId: string | null;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}