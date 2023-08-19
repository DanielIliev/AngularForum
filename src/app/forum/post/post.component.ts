import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from './post.service';
import { Post } from 'src/app/types/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserData } from 'src/app/types/Auth';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  loggedIn: boolean = false;
  isAuthor: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';
  postId: string = '';

  userData: UserData = {
    _id: '',
    username: '',
    email: '',
  };

  post: Post = {
    _id: '',
    title: '',
    content: '',
    author: '',
    authorName: '',
    comments: [],
  };

  commentForm: FormGroup = this.fb.group({
    username: '',
    comment: ['', [Validators.required, Validators.maxLength(350)]],
  });

  get comment() {
    return this.commentForm.get('comment');
  }

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => (this.postId = String(params.get('id')))
    );

    const userData = this.localStorageService.get('userData');

    if (userData) {
      this.userData = JSON.parse(userData);
      this.commentForm.patchValue({ username: this.userData.username });
      this.loggedIn = true;
    }

    this.postService.fetchPost(this.postId).subscribe({
      next: (response) => {
        this.post = response;
        

        if (this.userData._id === response.author) {
          this.isAuthor = true;
        }

        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['notfound']);
      },
    });
  }

  editPost(postId: String) {
    this.router.navigate([`/edit/${postId}`]);
  }

  deletePost(postId: String): void {
    const userId: string = this.userData._id;

    this.postService.deletePost(userId, String(postId)).subscribe({
      error: (err) => {
        this.errorMessage = err.statusText;
      },
      complete: () => {
        this.router.navigate(['/board']);
      },
    });
  }

  addComment(): void {
    if (this.commentForm.invalid) {
      this.errorMessage = 'The form you have submitted is invalid';
      return;
    }

    this.postService
      .addComment(String(this.post._id), this.commentForm.value)
      .subscribe({
        next: (response) => {
          this.post.comments = Object.values(response);
        },
        error: (err) => {
          if (err.error.errors) {
            this.errorMessage = err.error.errors[0].msg;
            return;
          }
        },
        complete: () => {
          this.errorMessage = '';
          this.commentForm.get('comment')?.reset();
        },
      });
  }
}
