import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.fetchData().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
