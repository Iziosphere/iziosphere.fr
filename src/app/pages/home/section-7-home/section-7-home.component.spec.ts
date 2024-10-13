import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section7HomeComponent } from './section-7-home.component';

describe('Section7HomeComponent', () => {
  let component: Section7HomeComponent;
  let fixture: ComponentFixture<Section7HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section7HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section7HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
