import { Component } from '@angular/core';
import { DifficultyButtonComponent } from './difficulty-button/difficulty-button.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tone-guess',
  standalone: true,
  imports: [DifficultyButtonComponent, CommonModule, MatIconModule, MatAccordion, MatExpansionModule, MatSlideToggleModule, FormsModule],
  templateUrl: './tone-guess.component.html',
  styleUrl: './tone-guess.component.css'
})

export class ToneGuessComponent {

  constructor(){
    this.notSelectedDifficulty = true
    this.difficulty = false
    this.wordList= [
      "sik",
      "haai",
      "maau",
      "baau",
      "bo",
      "nai",
      "wu",
      "ngo",
      "ngoi",
      "zou",
      "kaa",
    ],
    this.wordToggle = [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]
    this.guesses = []
    this.speed = 1;
    this.isCorrect= false;
    this.buttons = []
    this.buttonWidth = 0;
    this.displayText = "";
    this.word = ""
    this.tone = 0
    this.getRandomWord()
    this.totalGuess = 0;
    this.correctGuess = 0;
    this.sound = new Audio('/assets/sounds/words/' + this.word + '/' + this.word + this.tone + '.ogg');
    this.worstWord = new Map();
    this.worstTones = new Map();
    this.worstCombos = new Map();
    this.tog = false;
  }
  tog: boolean
  worstTones:Map<number,number>;
  worstWord:Map<string, number>;
  worstCombos:Map<string,number>;
  correctGuess: number ;
  totalGuess: number;
  buttons: string[];
  buttonWidth: number
  isCorrect: boolean;
  speed: number
  wordList:string[];
  wordToggle: boolean[];
  notSelectedDifficulty: boolean
  difficulty: boolean;
  sound : any;
  word: string;
  tone: number;
  displayText: string;
  guesses:guess[];


  doAction(val:number) {
    if(this.displayText == "") {
      this.makeGuess(val + 1);
    } else {
      this.reset()
    }
  }

  makeGuess(val:number) {
    if(this.difficulty) {
      this.isCorrect = val == this.tone
    } else {
      switch(val){
        case 1:
          this.isCorrect = [2,5].includes(this.tone);
          break
        case 2:
          this.isCorrect = [1,3,6].includes(this.tone);
          break
        case 3:
          this.isCorrect = 4 == this.tone;
          break
        default:
      }
    }
    if(this.isCorrect){
      this.correctGuess++;
    }
    this.guesses.push(
      {word: this.word, tone:  this.tone, wasCorrect: this.isCorrect}
    );
    this.totalGuess++;
    if(!this.isCorrect){
      this.calcStats({word: this.word, tone:this.tone, wasCorrect: false});
    }
    this.displayText = this.word + this.tone + (this.isCorrect ? "  ✓" : "  ✗")
  }

  calcStats(gues: guess){
    this.calWord(gues);
    this.calTone(gues);
    this.calCombo(gues);
  }

  calWord(gues : guess){
    let num = this.worstWord.get(gues.word);
    if(num){
      this.worstWord.set(gues.word, ++num);
    } else {
      this.worstWord.set(gues.word,1);
    }
  }

  calTone(gues : guess){
    let num = this.worstTones.get(gues.tone);
    if(num){
      this.worstTones.set(gues.tone, ++num);
    } else {
      this.worstTones.set(gues.tone,1);
    }
  }

  calCombo(gues : guess){
    let num = this.worstCombos.get(gues.word + gues.tone);
    if(num){
      this.worstCombos.set(gues.word + gues.tone, ++num);
    } else {
      this.worstCombos.set(gues.word + gues.tone,1);
    }
  }

  reset(){
    this.getRandomWord()
    this.sound = new Audio('/assets/sounds/words/' + this.word + '/' + this.word + this.tone + '.ogg');
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

  toggleAll(){
    for(let i in this.wordToggle){
      this.wordToggle[i] = true;
    }
  }

  unsetAll(){
    this.tog = false;
  }

  toggle(val: number) {
    this.wordToggle[val] = !this.wordToggle[val]
  }

  setSpeed(val:number) {
    this.sound.playbackRate = val
    this.speed = val;
  }

  getRandomWord() {
    let num = Math.floor(Math.random() * 11);
    if(this.wordToggle.filter(x => x === true).length == 0){
      return
    }
    while(!this.wordToggle[num]){
      num = Math.floor(Math.random() * 11);
    }
    this.word = this.wordList[num];
    this.tone = Math.floor(Math.random() * 6) + 1;
    if(this.word == "sik"){
      while(![1,3,6].includes(this.tone)){
        this.tone = Math.floor(Math.random() * 6) + 1;
      }
    }
  }

  getHighest(map: Map<any,number>, amount:number) : any[]{
    let arr = Array.from(map.keys())
    let list:any[] = [];
    arr.forEach(x => list.push({word:x, count: map.get(x)}));
    list.sort(function(x:any,y:any){return y.count - x.count});
    return list.slice(0,amount);
  }

  getWorstWord(){
    let rec = this.getHighest(this.worstWord,1);
    if(rec.length > 0) {
      return rec[0].word + ": " + rec[0].count + " Times wrong"
    }
    return [{word:"", count:0}];
  }


  getWorstTone(){
    let rec = this.getHighest(this.worstTones,1);
    if(rec.length > 0) {
      return (rec[0].word + ": " + rec[0].count + " Times wrong")
    }
    return [{word:"", count:0}];
  }

  getWorstCombos(_:number) {
    let rec = this.getHighest(this.worstCombos,3);
    if(rec.length > 0) {
      return rec
    }
    return [{word:"", count:0}];
  }
}
type guess = {
  word: string
  tone: number
  wasCorrect: boolean
};
