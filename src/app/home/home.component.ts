import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { GoButtonComponent } from '../../helper/go-button/go-button.component';
import { MenuComponent as GameMenu } from '../../games/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule, GoButtonComponent, GameMenu ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  active: Boolean[] = [false, false]

  flip = (ind : number) => {
    this.active[ind] = !this.active[ind]
  }

}
