import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { PostForm } from 'src/app/types/Post';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  addForm: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(350),
      ],
    ],
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addService: AddService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  get title() {
    return this.addForm.get('title');
  }

  get content() {
    return this.addForm.get('content');
  }

  add(event: Event): void {
    event.preventDefault();
    this.isLoading = true;

    if (this.addForm.invalid) {
      this.errorMessage = 'The form you have submitted is invalid!';
      this.isLoading = false;
      return;
    }

    const data: PostForm = this.addForm.value;
    const userData = this.localStorageService.get('userData');

    if (userData) {
      data.author = JSON.parse(userData)._id;
    }

    this.addService.addPost(data).subscribe({
      next: (response) => {
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.errors) {
          this.errorMessage = err.error.errors[0].msg;
        } else {
          this.errorMessage = err.message;
        }
        this.isLoading = false;
      },
      complete: () => {
        this.errorMessage = '';
        this.router.navigate(['board']);
      },
    });
  }
}
