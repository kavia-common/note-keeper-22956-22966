import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { Note } from '../models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, ReactiveFormsModule, AsyncPipe],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent implements OnInit {
  private notesService = inject(NotesService);
  private fb = inject(FormBuilder);

  notes: Note[] = [];
  loading = false;
  error: string | null = null;

  quickForm = this.fb.group({
    title: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.error = null;
    this.notesService.list().subscribe({
      next: (items) => {
        this.notes = (items || []).sort((a, b) => {
          const ad = a.updated_at || a.created_at || '';
          const bd = b.updated_at || b.created_at || '';
          return bd.localeCompare(ad);
        });
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load notes.';
      },
    });
  }

  // PUBLIC_INTERFACE
  quickCreate(): void {
    /** Quick create a new blank note with given title. */
    if (this.quickForm.invalid) return;
    const title = this.quickForm.value.title!;
    this.notesService.create({ title, content: '' }).subscribe({
      next: () => {
        this.quickForm.reset();
        this.fetch();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to create note.';
      },
    });
  }
}
