import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/constants/constants';
import { Post } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  fetchPosts() {
    const url: string = baseUrl + '/posts';

    return this.http.get<Post[]>(url);
  }
}
