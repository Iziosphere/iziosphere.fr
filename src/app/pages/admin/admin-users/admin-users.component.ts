import {Component, OnInit} from '@angular/core';
import {UserDtoList} from '../../../models/user.model';
import {UserService} from '../../../service/user.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-admin-users',
    imports: [
        FormsModule
    ],
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  userList: UserDtoList[] = [];
  filteredUsers: UserDtoList[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.userList = res;
      this.filteredUsers = res;
      console.log(this.userList);
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.userList.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          alert('User deleted successfully!');
          this.fetchUsers();
        },
        (error: any) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      );
    }
  }
}
