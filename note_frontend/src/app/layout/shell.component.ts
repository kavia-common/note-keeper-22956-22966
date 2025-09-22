import { Component, signal, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, AsyncPipe],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {
  private router = inject(Router);
  auth = inject(AuthService);

  email = this.auth.getUserEmail();

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
