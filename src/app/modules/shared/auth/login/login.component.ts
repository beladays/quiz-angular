import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';
import { UserStorageService } from '../services/user-storage.service';
import { AuthStateService } from '../services/auth-state.service';
import { DemoNgZorroAntdModules } from '../../../../DemoNgZorroAntdModules';
import { sharedImports } from '../signup/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    sharedImports,
    DemoNgZorroAntdModules,
    ReactiveFormsModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authStateService: AuthStateService,
    private message: NzMessageService,
    private router: Router,
  ){}

  validateForm!: FormGroup;

  ngOnInit(){
      this.validateForm = this.fb.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }
  submitForm(){
      this.authService.login(this.validateForm.value).subscribe(res=>{
        // this.message.success('Login com Sucesso.', {nzDuration: 5000});

          const user = {
           id: res.id,
           role: res.role,
           token: res.token
          };

    UserStorageService.saveUser(user);
    this.authStateService.setLoggedIn(true);
      
         if(user.role === "ADMIN") {
      this.router.navigateByUrl("/admin/dashboard");
    } else {
      this.router.navigateByUrl("/user/dashboard");
    }

      }, error=>{
        this.message
        .error(
          `Bad credentials`,
          {nzDuration: 5000}
        );
      }
    )
  }

}
