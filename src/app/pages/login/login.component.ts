import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserLoginDto} from '../../models/user.model';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginRequest: UserLoginDto = {email: '', password: ''};

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }


  public login() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.toastr.success('Login successful');
        this.router.navigate(['/']);
      },
      error: (err) => this.toastr.error(err.error.message)
    });
  }

}
