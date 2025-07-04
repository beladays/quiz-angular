import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { sharedImports } from '../signup/shared/shared.module';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [
    sharedImports

  ],
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {

  forgetForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private notification: NzNotificationService) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm(): void {
    if (this.forgetForm.invalid) {
      for (const i in this.forgetForm.controls) {
        if (this.forgetForm.controls.hasOwnProperty(i)) {
          this.forgetForm.controls[i].markAsDirty();
          this.forgetForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }

    this.loading = true;


    setTimeout(() => {
      this.loading = false;
      this.notification.success('Sucesso', 'Instruções para recuperação de senha foram enviadas para seu e-mail.');
      this.forgetForm.reset();
    }, 1500);
  }
}
