import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/auth/signup/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-test',
  imports: [
    SharedModule,
  ],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent {
  constructor(private fb: FormBuilder,
    private deviceService: AdminService,
    private notifications: NzNotificationService,
    private router: Router,

  ){}

  testForm! : FormGroup;

  ngOnInit(){
    this.testForm = this.fb.group({
      title:[null, Validators.required],
      description: [null, [Validators.required]],
      time: [null, [Validators.required]],
    })
  }

    submitForm(){
      if(this.testForm.valid){
        this.deviceService.createTest(this.testForm.value).subscribe(res=>{
          this.notifications
            .success(
              'SUCESS',
              'Quiz criado com sucesso.',
              {nzDuration: 5000}
            );
            this.router.navigateByUrl("/admin/dashboard")
      
        }, error=> {
          this.notifications
            .error(
              'ERROR',
              `${error.error}`,
              {nzDuration: 5000}
            )
        }
      )
      }
    }


}
