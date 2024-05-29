import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-angular-logo',
  standalone: true,
  imports: [],
  templateUrl: './angular-logo.component.html',
  styleUrl: './angular-logo.component.scss',
})
export class AngularLogoComponent {
  private readonly _authSvc = inject(AuthService);
  logout() {
    this._authSvc.logout();
  }
}
