import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userService = inject(UserService)
  router = inject(Router)


  logOff() {
    localStorage.removeItem('parkUser')
    this.router.navigateByUrl("/login")
  }
}
