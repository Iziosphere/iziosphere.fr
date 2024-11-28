import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {PostService} from '../../../service/post.service';
import {Category, PostCreateDto, PostType} from '../../../models/news.model';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
    selector: 'app-admin-create-posts',
    imports: [
        FormsModule
    ],
    templateUrl: './admin-create-post.component.html',
    styleUrl: './admin-create-post.component.scss'
})
export class AdminCreatePostComponent implements OnInit {

  categoryList: Category[] = [];
  postCreateDto: PostCreateDto = {
    title: '',
    content: '',
    slug: '',
    image: '',
    categoryId: 0,
    type: PostType.PUBLICATION,
    publishedAt: new Date()
  };

  constructor(private categoryService: CategoryService, private postService: PostService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoryList = res;
      console.log(this.categoryList);
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.postService.createPost(this.postCreateDto).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/posts']).then(() => this.toastrService.success('Post created successfully'))
        },
        error: (error) => {
          this.toastrService.error('Error creating post', error.message);
        }
      });
    }
  }
}
