import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCounterComponentComponent } from './user-counter-component.component';

describe('UserCounterComponentComponent', () => {
  let component: UserCounterComponentComponent;
  let fixture: ComponentFixture<UserCounterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCounterComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCounterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
