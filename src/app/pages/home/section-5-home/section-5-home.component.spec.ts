import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section5HomeComponent } from './section-5-home.component';

describe('Section5HomeComponent', () => {
  let component: Section5HomeComponent;
  let fixture: ComponentFixture<Section5HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section5HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section5HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
