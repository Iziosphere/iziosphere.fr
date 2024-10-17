import {Component, OnInit} from '@angular/core';
import {IpDataService} from '../../../service/ip-data.service';
import {IpData} from '../../../models/ip-data.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DatePipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-iplocation',
  standalone: true,
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

  constructor(private ipDataService: IpDataService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userAgent = navigator.userAgent;
    this.screenResolution = screen.width + 'x' + screen.height;
    this.getIpInformation();
  }

  getIpInformation(): void {
    this.loading = true;
    this.ipDataService.getIpData(this.ipAddress).subscribe({
      next: (data: IpData) => {
        this.ipData = data;
        this.setMapUrl();
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        this.ipData= null;
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
