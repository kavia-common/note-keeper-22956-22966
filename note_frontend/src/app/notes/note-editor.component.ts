import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { Note } from '../models';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css',
})
export class NoteEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private notes = inject(NotesService);

  loading = false;
  error: string | null = null;
  noteId!: string;
  note: Note | null = null;

  form = this.fb.group({
    title: ['', [Validators.required]],
    content: [''],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.noteId = id;
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.error = null;
    this.notes.get(this.noteId).subscribe({
      next: (n) => {
        this.note = n;
        this.form.patchValue({ title: n.title, content: n.content });
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load note.';
      },
    });
  }

  // PUBLIC_INTERFACE
  save(): void {
    /** Save changes to the note. */
    if (this.form.invalid) return;
    const { title, content } = this.form.value;
    this.notes.update(this.noteId, { title: title!, content: content || '' }).subscribe({
      next: (n) => {
        this.note = n;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to save note.';
      },
    });
  }

  // PUBLIC_INTERFACE
  remove(): void {
    /** Delete the current note and navigate back to list. */
    this.notes.remove(this.noteId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to delete note.';
      },
    });
  }
}
