import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css',
})
export class NewNoteComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notes = inject(NotesService);

  error: string | null = null;

  form = this.fb.group({
    title: ['', [Validators.required]],
    content: [''],
  });

  // PUBLIC_INTERFACE
  create(): void {
    /** Create a new note and navigate to its editor. */
    if (this.form.invalid) return;
    const { title, content } = this.form.value;
    this.notes.create({ title: title!, content: content || '' }).subscribe({
      next: (n) => {
        this.router.navigate(['/note', (n as any).id]);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to create note.';
      },
    });
  }
}
