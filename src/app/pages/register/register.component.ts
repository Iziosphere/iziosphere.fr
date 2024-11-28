import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserCreateDto} from '../../models/user.model';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-register',
    imports: [
        RouterLink,
        FormsModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest: UserCreateDto = {firstName: '', lastName: '', email: '', password: ''};

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }


  public register() {
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        this.toastr.success('User registered successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => this.toastr.error(err.error.message)
    });
  }

}
