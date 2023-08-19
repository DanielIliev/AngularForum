import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { WINDOW } from './utils/window.injectable';
import { fadeInOut } from './route-animations';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut],
})
export class AppComponent implements OnInit {
  isShown: string = 'open';
  loggedIn: boolean = false;
  active: boolean = false;
  token: string | null = this.localStorageService.get('authToken');

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(WINDOW) private window: Window
  ) {
    this.window.addEventListener('storage', (event) => {
      const token = this.localStorageService.get('authToken');

      if (token === null) {
        this.localStorageService.remove('userData');
        this.window.location.reload();
      }

      if (token !== null) {
        const userData = jwt(token);
        this.localStorageService.set('userData', JSON.stringify(userData));
      }
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this.loggedIn = true;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  toggleIconAnimation() {
    this.active = !this.active;
  }

  logout(event: Event) {
    event.preventDefault();
    this.localStorageService.remove('authToken');
    this.localStorageService.remove('userData');
    this.window.location.reload();
  }
}
