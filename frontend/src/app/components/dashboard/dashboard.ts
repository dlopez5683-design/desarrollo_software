import {
  Component,
  computed,
  input
} from '@angular/core';

import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  readonly tickets = input<Ticket[]>([]);

  readonly total = computed(() =>
    this.tickets().length
  );

  readonly abiertos = computed(() =>
    this.tickets().filter(
      ticket => ticket.estado === 'Abierto'
    ).length
  );

  readonly enProgreso = computed(() =>
    this.tickets().filter(
      ticket => ticket.estado === 'En Progreso'
    ).length
  );

  readonly cerrados = computed(() =>
    this.tickets().filter(
      ticket => ticket.estado === 'Cerrado'
    ).length
  );

  readonly prioridadAlta = computed(() =>
    this.tickets().filter(
      ticket => ticket.prioridad === 'Alta'
    ).length
  );
}