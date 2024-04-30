import { Component } from '@angular/core';
import { DifficultyButtonComponent } from './difficulty-button/difficulty-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tone-guess',
  standalone: true,
  imports: [DifficultyButtonComponent, CommonModule],
  templateUrl: './tone-guess.component.html',
  styleUrl: './tone-guess.component.css'
})
export class ToneGuessComponent {



  constructor(){
    this.notSelectedDifficulty = true
    this.difficulty = false
  }

  notSelectedDifficulty: boolean
  difficulty: boolean;

  setDifficulty(val: boolean) {
    this.notSelectedDifficulty = false;
    this.difficulty = val;
    console.log(this.difficulty)
  }
}
