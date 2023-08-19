import { Component, OnInit } from '@angular/core';
import { MONGODB_URI } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  active: boolean = false;
  title = 'forum-app';

  toggleIconAnimation() {
    this.active = !this.active;
  }
}
