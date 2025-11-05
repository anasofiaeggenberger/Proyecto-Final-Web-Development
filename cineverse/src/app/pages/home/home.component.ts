import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedMood: string | null = null;

  setMood(mood: string, gradient: string) {
    const hero = document.querySelector('.hero') as HTMLElement;
    hero.style.background = `linear-gradient(120deg, ${gradient})`;
    hero.style.transition = 'background 1s ease';
    this.selectedMood = mood;
  }

  resetMood() {
    const hero = document.querySelector('.hero') as HTMLElement;
    hero.style.background = 'linear-gradient(120deg, #ff6b81, #8e44ad)';
    hero.style.transition = 'background 1s ease';
    this.selectedMood = null;
  }
}