import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userService = inject(UserService)
  loginForm!: FormGroup
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }



  onLogin() {

    if (this.loginForm.valid) {
      const loginObj = {
        emailId: this.loginForm.get('emailId')?.value,
        password: this.loginForm.get('password')?.value
      };
    
    
    this.userService.loginUser(loginObj).subscribe((res: IUserModel) => {
      localStorage.setItem('parkUser', JSON.stringify(res))
      this.userService.loggedData = res
      this.router.navigateByUrl('/dashboard')
      alert('done')
    }, error => alert('wrong'))
  }

}
}
