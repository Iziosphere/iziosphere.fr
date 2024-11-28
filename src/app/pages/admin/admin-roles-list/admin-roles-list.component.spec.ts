import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRolesListComponent } from './admin-roles-list.component';

describe('AdminRolesListComponent', () => {
  let component: AdminRolesListComponent;
  let fixture: ComponentFixture<AdminRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRolesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
