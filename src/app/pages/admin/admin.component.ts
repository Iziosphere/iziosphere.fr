import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { RouterModule } from '@angular/router';
import {UserService} from '../../service/user.service';
import {UserDto} from '../../models/user.model';
import {AuthService} from '../../service/auth.service';

@Component({
    selector: 'app-admin',
    imports: [RouterModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    encapsulation: ViewEncapsulation.None // Désactiver l'encapsulation
})
export class AdminComponent implements OnInit{

    session? : UserDto;
    constructor(private userService : UserService,private authService: AuthService) {
    }

    ngOnInit(): void {
        this.userService.getMyInfos().subscribe((user: UserDto) => {
            this.session = user;
          console.log(this.session);
        });
    }

    logout() {
        this.authService.logout();
    }

}
