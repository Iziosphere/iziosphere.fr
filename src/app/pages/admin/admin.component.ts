import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.None // Désactiver l'encapsulation
})
export class AdminComponent {

}
