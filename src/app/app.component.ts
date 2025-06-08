import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SharedModule } from './modules/shared/auth/signup/shared/shared.module';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-angular';
}
