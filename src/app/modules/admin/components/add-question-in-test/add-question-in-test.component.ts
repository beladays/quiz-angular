import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/auth/signup/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question-in-test',
  imports: [
    SharedModule
  ],
  templateUrl: './add-question-in-test.component.html',
  styleUrl: './add-question-in-test.component.css'
})
export class AddQuestionInTestComponent {


  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  id: number | null;
  questionForm!: FormGroup;

  ngOnInit(){
    this.questionForm = this.fb.group({
      questionText:[null,[Validators.required]],
      optionA: [null, [ Validators.required]],
      optionB: [null, [Validators.required]],
      optionC: [null, [Validators.required]],
      optionD: [null, [Validators.required]],
      correctOption: [null, [Validators.required]],
    });
    this.id = this.activatedRoute.snapshot.params["id"];
    }

    submitForm(){
      const questionDto = this.questionForm.value;
      questionDto.id = this.id;

      this.adminService.addQuestionInTest(questionDto).subscribe(res=>{
        this.notification
        .success(
          'SUCESS',
          `Pergunta criada com sucesso.`,
          {nzDuration: 5000}
        );
        this.router.navigateByUrl("/admin/dashboard")
      }, error =>{
        this.notification
        .error(
          'ERROR',
          `${error.error}`,
          {nzDuration: 5000}
        );
      }
    )
    }

}
