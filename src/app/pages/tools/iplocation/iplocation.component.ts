import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {IpDataService} from '../../../service/ip-data.service';
import {IpData} from '../../../models/ip-data.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DatePipe, isPlatformBrowser, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-iplocation',
    imports: [
        DatePipe,
        FormsModule,
        NgIf
    ],
    templateUrl: './iplocation.component.html',
    styleUrl: './iplocation.component.scss'
})
export class IplocationComponent implements OnInit {
  ipData!: IpData | null;
  userAgent: string = '';
  screenResolution: string = '';
  mapUrl!: SafeResourceUrl;
  ipAddress: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private ipDataService: IpDataService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userAgent = navigator.userAgent;
      this.screenResolution = screen.width + 'x' + screen.height;
      this.getIpInformation();
    }
  }

  getIpInformation(): void {
    this.loading = true;
    this.errorMessage = '';
    this.ipDataService.getIpData(this.ipAddress).subscribe({
      next: (data: IpData) => {
        this.loading = false;
        if (data.success) {
          this.ipData = data;
          this.setMapUrl();
        } else {
          this.ipData = null;
          this.errorMessage = data.message || 'Une erreur est survenue.';
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.ipData= null;
        this.errorMessage = 'Une erreur réseau est survenue.';
      }
    });
    }

  setMapUrl(): void {
    const lat = this.ipData!.latitude;
    const lon = this.ipData!.longitude;
    const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
