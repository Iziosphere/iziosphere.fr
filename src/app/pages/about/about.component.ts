import { Component } from '@angular/core';
import { Section2HomeComponent } from "../home/section-2-home/section-2-home.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Section2HomeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
