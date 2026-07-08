import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc, query, orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private firestore = inject(Firestore);
  private ticketsRef = collection(this.firestore, 'tickets');

  getTickets(): Observable<Ticket[]> {
    const q = query(this.ticketsRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Ticket[]>;
  }

  createTicket(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Date.now();
    return addDoc(this.ticketsRef, { ...ticket, createdAt: now, updatedAt: now });
  }

  updateTicket(id: string, changes: Partial<Ticket>) {
    const ref = doc(this.firestore, `tickets/${id}`);
    return updateDoc(ref, { ...changes, updatedAt: Date.now() });
  }

  deleteTicket(id: string) {
    const ref = doc(this.firestore, `tickets/${id}`);
    return deleteDoc(ref);
  }
}