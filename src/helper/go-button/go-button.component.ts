import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { textStyle } from '../models/textStyle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-button',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './go-button.component.html',
  styleUrl: './go-button.component.css'
})
export class GoButtonComponent {

  constructor(private router: Router){}

  @Input() src!: string;
  @Input() altText!: string;
  @Input() title!: string;
  @Input() body!: textStyle[];
  @Input() to!: string;
  grabTabs(size: number) {
    return 2 * size + "rem";
  }

  goToPage(){
    this.router.navigate([this.to]);
  }
}
