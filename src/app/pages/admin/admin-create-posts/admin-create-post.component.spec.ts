import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePostComponent } from './admin-create-post.component';

describe('AdminPostsComponent', () => {
  let component: AdminCreatePostComponent;
  let fixture: ComponentFixture<AdminCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreatePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
