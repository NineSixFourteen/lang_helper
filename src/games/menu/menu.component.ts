import { Component } from '@angular/core';
import { GoButtonComponent } from '../../helper/go-button/go-button.component';
import { textStyle } from '../../helper/models/textStyle';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [GoButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  buttonDes: textStyle[][] =
    [
      [
        {text:"Description:", style:"font-weight:600", class:"", newline:true, tab:0},
        {text:"Listen to the word and guess the tone used.",style:"", class:"",newline:true, tab:1},
        {text:"Modes:",style:"font-weight:600", class:"",newline:true, tab:0,},
        {text:" 1. Rise, Flat, Fall ",style:"", class:"",newline:true, tab:1},
        {text:" 2. 1-6",style:"", class:"",newline:true, tab:1},
      ],
    ];

}
