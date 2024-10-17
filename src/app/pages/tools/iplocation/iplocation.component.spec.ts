import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IplocationComponent } from './iplocation.component';

describe('IplocationComponent', () => {
  let component: IplocationComponent;
  let fixture: ComponentFixture<IplocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IplocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IplocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
