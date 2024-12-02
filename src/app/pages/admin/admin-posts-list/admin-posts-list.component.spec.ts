import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostsListComponent } from './admin-posts-list.component';

describe('AdminPostsListComponent', () => {
  let component: AdminPostsListComponent;
  let fixture: ComponentFixture<AdminPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPostsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
