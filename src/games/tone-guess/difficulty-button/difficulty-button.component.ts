import { Component, EventEmitter, Input, Output } from '@angular/core';
import { textStyle } from '../../../helper/models/textStyle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-difficulty-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './difficulty-button.component.html',
  styleUrl: './difficulty-button.component.css'
})
export class DifficultyButtonComponent {

  @Output() func = new EventEmitter<boolean>();
  @Input() src!: string;
  @Input() altText!: string;
  @Input() title!: string;
  @Input() body!: textStyle[];
  @Input() value!: boolean;

  grabTabs(size: number) {
    return 2 * size + "rem";
  }

  triggerFunc(val: boolean){
    this.func.emit(val);
  }


}
