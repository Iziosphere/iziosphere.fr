import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section6HomeComponent } from './section-6-home.component';

describe('Section6HomeComponent', () => {
  let component: Section6HomeComponent;
  let fixture: ComponentFixture<Section6HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section6HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section6HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
