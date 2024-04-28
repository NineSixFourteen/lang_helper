import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { NavComponent }  from './layout/nav/nav.component';
import { FooterComponent} from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, HomeComponent,NavComponent , FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lang_helper';
}
