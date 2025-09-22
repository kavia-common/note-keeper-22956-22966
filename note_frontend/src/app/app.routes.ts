import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { NotesListComponent } from './notes/notes-list.component';
import { NoteEditorComponent } from './notes/note-editor.component';
import { NewNoteComponent } from './notes/new-note.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: NotesListComponent, canActivate: [authGuard] },
      { path: 'note/:id', component: NoteEditorComponent, canActivate: [authGuard] },
      { path: 'new', component: NewNoteComponent, canActivate: [authGuard] },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' },
];
