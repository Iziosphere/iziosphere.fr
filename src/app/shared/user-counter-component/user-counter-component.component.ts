import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {SocketService} from '../../service/socket.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-user-counter-component',
  imports: [],
  templateUrl: './user-counter-component.component.html',
  styleUrl: './user-counter-component.component.scss'
})
export class UserCounterComponent implements OnInit, OnDestroy {
  userCount = 0;
  private isBrowser: boolean;

  constructor(
    private socketService: SocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.socketService.getUserCount((count: number) => {
        this.userCount = count;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.socketService.disconnect();
    }
  }
}
