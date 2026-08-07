import {
  Component,
  EventEmitter,
  Output,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css'
})
export class TicketForm {
  @Output()
  readonly ticketCreado =
    new EventEmitter<void>();

  private readonly fb =
    inject(FormBuilder);

  private readonly ticketService =
    inject(TicketService);

  readonly enviando = signal<boolean>(false);
  readonly mensaje = signal<string>('');
  readonly error = signal<string>('');

  readonly formulario =
    this.fb.nonNullable.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],

      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ],

      categoria: [
        'Hardware',
        Validators.required
      ],

      prioridad: [
        'Media',
        Validators.required
      ],

      estado: [
        'Abierto',
        Validators.required
      ]
    });

  guardar(): void {
    this.mensaje.set('');
    this.error.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();

      this.error.set(
        'Revise los campos obligatorios.'
      );

      return;
    }

    const valores =
      this.formulario.getRawValue();

    const ticket: Ticket = {
      titulo:
        this.limpiarTexto(valores.titulo),

      descripcion:
        this.limpiarTexto(valores.descripcion),

      categoria:
        valores.categoria as Ticket['categoria'],

      prioridad:
        valores.prioridad as Ticket['prioridad'],

      estado:
        valores.estado as Ticket['estado']
    };

    this.enviando.set(true);

    this.ticketService
      .crearTicket(ticket)
      .subscribe({
        next: response => {
          this.mensaje.set(
            response.mensaje ??
            'Ticket registrado correctamente.'
          );

          this.formulario.reset({
            titulo: '',
            descripcion: '',
            categoria: 'Hardware',
            prioridad: 'Media',
            estado: 'Abierto'
          });

          this.enviando.set(false);

          /*
           * Comunica a AppComponent que debe
           * consultar nuevamente los tickets.
           */
          this.ticketCreado.emit();
        },

        error: error => {
          console.error(
            'Error al registrar el ticket:',
            error
          );

          this.enviando.set(false);

          this.error.set(
            error.error?.mensaje ??
            error.error?.error ??
            'No se pudo registrar el ticket.'
          );
        }
      });
  }

  campoInvalido(
    campo: string
  ): boolean {
    const control =
      this.formulario.get(campo);

    return Boolean(
      control &&
      control.invalid &&
      (
        control.touched ||
        control.dirty
      )
    );
  }

  private limpiarTexto(
    texto: string
  ): string {
    return texto
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}