import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedMood: string = '';

  selectMood(mood: string) {
    this.selectedMood = mood;
    window.location.href = '/movies';
  }

  moods = [
    { name: 'romantico', label: 'Romántico', icon: 'fa-solid fa-heart', color: '#ff7b9c' },
    { name: 'energetico', label: 'Energético', icon: 'fa-solid fa-bolt', color: '#ffae00' },
    { name: 'nostalgico', label: 'Nostálgico', icon: 'fa-solid fa-film', color: '#8a7ff6' },
    { name: 'triste', label: 'Triste', icon: 'fa-solid fa-cloud-rain', color: '#5dade2' },
    { name: 'feliz', label: 'Feliz', icon: 'fa-solid fa-sun', color: '#ffe66d' }
  ];  

  getMoodClass() {
    return this.selectedMood ? `mood-${this.selectedMood}` : '';
  }
}