import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';

import { TicketService } from '../../services/ticket.service';

import {
  EstadoTicket,
  Ticket
} from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,

  imports: [
    DatePipe
  ],

  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList {
  @Input()
  tickets: Ticket[] = [];

  @Input()
  cargando = false;

  @Output()
  readonly datosModificados =
    new EventEmitter<void>();

  private readonly ticketService =
    inject(TicketService);

  readonly mensaje = signal<string>('');
  readonly error = signal<string>('');

  /*
   * Guarda el identificador del ticket que está
   * siendo procesado para deshabilitar sus controles.
   */
  readonly procesandoId =
    signal<string | null>(null);

  onEstadoChange(
    ticket: Ticket,
    event: Event
  ): void {
    const elemento =
      event.target as HTMLSelectElement;

    const nuevoEstado =
      elemento.value as EstadoTicket;

    this.cambiarEstado(
      ticket,
      nuevoEstado
    );
  }

  cambiarEstado(
    ticket: Ticket,
    nuevoEstado: EstadoTicket
  ): void {
    if (
      !ticket._id ||
      nuevoEstado === ticket.estado
    ) {
      return;
    }

    this.mensaje.set('');
    this.error.set('');
    this.procesandoId.set(ticket._id);

    this.ticketService
      .actualizarTicket(
        ticket._id,
        {
          estado: nuevoEstado
        }
      )
      .pipe(
        finalize(() => {
          this.procesandoId.set(null);
        })
      )
      .subscribe({
        next: response => {
          this.mensaje.set(
            response.mensaje ??
            'Ticket actualizado correctamente.'
          );

          /*
           * AppComponent ejecutará nuevamente
           * GET /tickets y actualizará su señal.
           */
          this.datosModificados.emit();
        },

        error: error => {
          console.error(
            'Error al actualizar el ticket:',
            error
          );

          this.error.set(
            error.error?.mensaje ??
            'No se pudo actualizar el ticket.'
          );

          /*
           * Restaura los datos reales si la
           * actualización fue rechazada.
           */
          this.datosModificados.emit();
        }
      });
  }

  eliminar(
    ticket: Ticket
  ): void {
    if (!ticket._id) {
      this.error.set(
        'El ticket no posee un identificador válido.'
      );

      return;
    }

    const confirmado = window.confirm(
      `¿Está seguro de eliminar el ticket "${ticket.titulo}"?`
    );

    if (!confirmado) {
      return;
    }

    this.mensaje.set('');
    this.error.set('');
    this.procesandoId.set(ticket._id);

    this.ticketService
      .eliminarTicket(ticket._id)
      .pipe(
        finalize(() => {
          this.procesandoId.set(null);
        })
      )
      .subscribe({
        next: response => {
          this.mensaje.set(
            response.mensaje ??
            'Ticket eliminado correctamente.'
          );

          /*
           * Solicita una nueva consulta GET.
           */
          this.datosModificados.emit();
        },

        error: error => {
          console.error(
            'Error al eliminar el ticket:',
            error
          );

          this.error.set(
            error.error?.mensaje ??
            'No se pudo eliminar el ticket.'
          );
        }
      });
  }

  clasePrioridad(
    prioridad: string
  ): string {
    return `badge badge--${prioridad.toLowerCase()}`;
  }

  claseEstado(
    estado: string
  ): string {
    return `badge badge--${estado
      .toLowerCase()
      .replace(/\s+/g, '-')}`;
  }
}