import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDarkMode: boolean;

  constructor() {
    this.isDarkMode = this.getThemeFromStorage();
  }

  ngOnInit() {
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
    this.storeThemeInStorage();
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  private storeThemeInStorage() {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private getThemeFromStorage(): boolean {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark';
  }
}
