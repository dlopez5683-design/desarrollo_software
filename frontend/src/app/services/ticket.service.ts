import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Ticket,
  TicketListResponse,
  TicketResponse
} from '../models/ticket.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/tickets`;

  obtenerTickets(): Observable<TicketListResponse> {
    return this.http.get<TicketListResponse>(
      this.apiUrl
    );
  }

  obtenerTicketPorId(
    id: string
  ): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(
      `${this.apiUrl}/${id}`
    );
  }

  crearTicket(
    ticket: Ticket
  ): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(
      this.apiUrl,
      ticket
    );
  }

  actualizarTicket(
    id: string,
    cambios: Partial<Ticket>
  ): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(
      `${this.apiUrl}/${id}`,
      cambios
    );
  }

  eliminarTicket(
    id: string
  ): Observable<TicketResponse> {
    return this.http.delete<TicketResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}