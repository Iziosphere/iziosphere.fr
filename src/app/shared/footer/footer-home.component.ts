import {Component, ViewEncapsulation} from '@angular/core';
import {UserCounterComponent} from '../user-counter-component/user-counter-component.component';

@Component({
    selector: 'app-footer',
  imports: [
    UserCounterComponent
  ],
    templateUrl: './footer-home.component.html',
    styleUrl: './footer-home.component.scss'
})
export class FooterHomeComponent {

}
