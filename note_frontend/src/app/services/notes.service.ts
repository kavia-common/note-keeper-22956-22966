import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note, CreateNotePayload, UpdateNotePayload } from '../models';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private baseUrl = `${environment.apiBaseUrl}/notes`;

  // PUBLIC_INTERFACE
  list(): Observable<Note[]> {
    /** List all notes for the current user. */
    return this.http.get<Note[]>(`${this.baseUrl}/`, { headers: this.auth.authHeaders() });
  }

  // PUBLIC_INTERFACE
  get(noteId: string | number): Observable<Note> {
    /** Get a single note by id. */
    return this.http.get<Note>(`${this.baseUrl}/${noteId}`, { headers: this.auth.authHeaders() });
  }

  // PUBLIC_INTERFACE
  create(payload: CreateNotePayload): Observable<Note> {
    /** Create a new note. */
    return this.http.post<Note>(`${this.baseUrl}/`, payload, { headers: this.auth.authHeaders() });
  }

  // PUBLIC_INTERFACE
  update(noteId: string | number, payload: UpdateNotePayload): Observable<Note> {
    /** Update an existing note by id. */
    return this.http.patch<Note>(`${this.baseUrl}/${noteId}`, payload, { headers: this.auth.authHeaders() });
  }

  // PUBLIC_INTERFACE
  remove(noteId: string | number): Observable<void> {
    /** Delete note by id. */
    return this.http.delete<void>(`${this.baseUrl}/${noteId}`, { headers: this.auth.authHeaders() });
  }
}
