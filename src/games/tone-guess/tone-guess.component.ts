import { Component } from '@angular/core';
import { DifficultyButtonComponent } from './difficulty-button/difficulty-button.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { StatTracker } from './StatTracker';
import { WordTracker } from './WordTracker';
@Component({
  selector: 'app-tone-guess',
  standalone: true,
  imports: [DifficultyButtonComponent, CommonModule, MatIconModule, MatAccordion, MatExpansionModule, MatSlideToggleModule, FormsModule],
  templateUrl: './tone-guess.component.html',
  styleUrl: './tone-guess.component.css'
})

export class ToneGuessComponent {

  constructor(){
    this.Words = new WordTracker();
    this.Stats = new StatTracker();
    this.notSelectedDifficulty = true
    this.difficulty = false
    this.speed = 1;
    this.isCorrect= false;
    this.buttons = []
    this.buttonWidth = 0;
    this.displayText = "";
    [this.word, this.tone] = this.Words.getRandomWordSep();
    this.sound = new Audio("http://" + environment.talksite  + '/' + this.word + this.tone + '.ogg');
    this.tog = false;
  }
  Words: WordTracker;
  Stats: StatTracker;
  tog: boolean
  buttons: string[];
  buttonWidth: number
  isCorrect: boolean;
  speed: number
  notSelectedDifficulty: boolean
  difficulty: boolean;
  sound : any;
  word: string;
  tone: number;
  displayText: string;


  unsetAll(){
    this.tog = false
  }

  doAction(val:number) {
    if(this.displayText == "") {
      this.makeGuess(val + 1);
    } else {
      this.reset()
    }
  }

  makeGuess(val:number) {
    let correct = false;
    if(this.difficulty) {
      correct = val == this.tone
    } else {
      switch(val){
        case 1:
          correct = [2,5].includes(this.tone);
          break
        case 2:
          correct = [1,3,6].includes(this.tone);
          break
        case 3:
          correct = 4 == this.tone;
          break
        default:
      }
    }
    this.isCorrect = correct
    this.Stats.addGuess(this.word, this.tone, correct);
    this.displayText = this.word + this.tone + (correct ? "  ✓" : "  ✗")
  }

  reset(){
    [this.word, this.tone] = this.Words.getRandomWordSep();
    this.sound = new Audio('http://' + environment.talksite  + '/' + this.word + this.tone + '.ogg');
    this.displayText = "";
  }

  playSound(){
    this.sound.play();
  }

  setDifficulty(val: boolean) {
    this.notSelectedDifficulty = false;
    this.difficulty = val;
    if(!val){
      this.buttons = [
        "1.Rise", "2.Flat", "3.Fall"
      ]
      this.buttonWidth= 100;
    } else {
      this.buttons = [
        "1.High Flate", "2.Mid To High", "3. Mid Flat", "4. Low-Mid to Low",
        "5. Low-Mid to Mid", "6. Low-Mid Flat"
      ]
    }
    this.buttonWidth = 14;
  }

  setSpeed(val:number) {
    this.sound.playbackRate = val
    this.speed = val;
  }
}
