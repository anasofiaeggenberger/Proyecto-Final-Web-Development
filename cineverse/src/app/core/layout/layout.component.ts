import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isDarkMode = true; 

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');
  }
}