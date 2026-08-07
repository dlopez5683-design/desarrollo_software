export type CategoriaTicket =
  | 'Red'
  | 'Hardware'
  | 'Software';

export type PrioridadTicket =
  | 'Alta'
  | 'Media'
  | 'Baja';

export type EstadoTicket =
  | 'Abierto'
  | 'En Progreso'
  | 'Cerrado';

export interface Ticket {
  _id?: string;
  titulo: string;
  descripcion: string;
  categoria: CategoriaTicket;
  prioridad: PrioridadTicket;
  estado: EstadoTicket;
  createdAt?: string;
  updatedAt?: string;
}

export interface TicketListResponse {
  exito: boolean;
  cantidad: number;
  datos: Ticket[];
}

export interface TicketResponse {
  exito: boolean;
  mensaje?: string;
  datos: Ticket;
}