import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  active: boolean = false;
  title = 'forum-app';

  toggleIconAnimation() {
    this.active = !this.active;
  }

  ngOnInit(): void {
    console.log(process.env);
    
  }
}
