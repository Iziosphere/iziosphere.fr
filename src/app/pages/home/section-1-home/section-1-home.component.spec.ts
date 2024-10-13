import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section1HomeComponent } from './section-1-home.component';

describe('Section1HomeComponent', () => {
  let component: Section1HomeComponent;
  let fixture: ComponentFixture<Section1HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section1HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section1HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
