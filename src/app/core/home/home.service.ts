import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_ENDPOINT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  fetchData(): any {
    const url = SERVER_ENDPOINT + '/posts';

    // const headers = {
    //   'Content-Type': 'application/json',
    // };

    // console.log(headers);
    

    return this.http.get<any>(url);
  }
}
