import { Component } from '@angular/core';
import { SharedModule } from '../signup/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
  ){}
  validateForm!: FormGroup;
  ngOnInit(){
    this.validateForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
}
