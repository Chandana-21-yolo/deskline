import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Ticket, TicketStatus, TicketPriority } from '../models/ticket.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private ticketService = inject(TicketService);
  auth = inject(AuthService);
  private router = inject(Router);

  statusFilter: TicketStatus | 'all' = 'all';
  priorityFilter: TicketPriority | 'all' = 'all';
  editing: Ticket | null = null;

  newTitle = '';
  newDescription = '';
  newPriority: TicketPriority = 'medium';

  tickets$ = this.ticketService.getTickets();
  statuses: TicketStatus[] = ['open', 'in-progress', 'resolved'];

  filtered$: Observable<Ticket[]> = this.tickets$.pipe(
    map(list => list.filter(t =>
      (this.statusFilter === 'all' || t.status === this.statusFilter) &&
      (this.priorityFilter === 'all' || t.priority === this.priorityFilter)
    ))
  );

  byStatus(list: Ticket[], status: TicketStatus) {
    return list.filter(t => t.status === status);
  }

  async createTicket() {
    if (!this.newTitle.trim()) return;
    const user = await this.currentUid();
    await this.ticketService.createTicket({
      title: this.newTitle,
      description: this.newDescription,
      priority: this.newPriority,
      status: 'open',
      assigneeId: null,
      createdBy: user ?? 'unknown',
    });
    this.newTitle = '';
    this.newDescription = '';
    this.newPriority = 'medium';
  }

  private async currentUid(): Promise<string | null> {
    return new Promise(resolve => {
      this.auth.user$.subscribe(u => resolve(u?.uid ?? null));
    });
  }

  startEdit(t: Ticket) { this.editing = { ...t }; }
  cancelEdit() { this.editing = null; }

  async saveEdit() {
    if (!this.editing?.id) return;
    await this.ticketService.updateTicket(this.editing.id, {
      title: this.editing.title,
      description: this.editing.description,
      priority: this.editing.priority,
    });
    this.editing = null;
  }

  async changeStatus(t: Ticket, status: TicketStatus) {
    if (!t.id) return;
    await this.ticketService.updateTicket(t.id, { status });
  }

  async assign(t: Ticket, assigneeId: string) {
    if (!t.id) return;
    await this.ticketService.updateTicket(t.id, { assigneeId: assigneeId || null });
  }

  async remove(t: Ticket) {
    if (!t.id) return;
    if (confirm(`Delete "${t.title}"?`)) await this.ticketService.deleteTicket(t.id);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}