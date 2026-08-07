import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { Navbar } from './components/navbar/navbar';
import { Dashboard } from './components/dashboard/dashboard';
import { TicketForm } from './components/ticket-form/ticket-form';
import { TicketList } from './components/ticket-list/ticket-list';

import { TicketService } from './services/ticket.service';
import { Ticket } from './models/ticket.model';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    Navbar,
    Dashboard,
    TicketForm,
    TicketList
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private readonly ticketService =
    inject(TicketService);

  readonly tickets = signal<Ticket[]>([]);
  readonly cargando = signal<boolean>(false);
  readonly errorGeneral = signal<string>('');

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.cargando.set(true);
    this.errorGeneral.set('');

    this.ticketService.obtenerTickets().subscribe({
      next: response => {
        const registros = Array.isArray(response.datos)
          ? response.datos
          : [];

        this.tickets.set([...registros]);
        this.cargando.set(false);
      },

      error: error => {
        console.error(
          'Error al consultar los tickets:',
          error
        );

        this.tickets.set([]);
        this.cargando.set(false);

        this.errorGeneral.set(
          error.error?.mensaje ??
          'No fue posible obtener los tickets.'
        );
      }
    });
  }
}