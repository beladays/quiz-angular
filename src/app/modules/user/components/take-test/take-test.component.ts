import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TestService } from '../../services/test.service';
import { UserStorageService } from '../../../shared/auth/services/user-storage.service';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';

@Component({
  selector: 'app-take-test',
  imports: [
   sharedImports
  ],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css'
})
export class TakeTestComponent {

  questions: any[] = [];
  testId: any;

selectedAnswers: {[key:number]: string} ={};

  constructor(private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private router: Router
  ){}
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
      this.testId = +params.get('id');

      this.testService.getTestQuestions(this.testId).subscribe(res=>{
        this.questions = res.questions;
        console.log(this.questions);
      })
    })
  }
  onAnswerChange(questionId: number, selectedOption:string){
      this.selectedAnswers[questionId]= selectedOption;
      console.log(this.selectedAnswers);
    }

    submitAnswers(){
      const answerList = Object.keys(this.selectedAnswers).map(questionId=>{
        return{
          questionId: +questionId,
          selectedOption: this.selectedAnswers[questionId]
        }
      })

      const data ={
        testId: this.testId,
        userId: UserStorageService.getUserId(),
        responses: answerList
      }
      this.testService.submitTest(data).subscribe(res=>{
        this.message
        .success(
          `Quiz enviado com sucesso`,
          { nzDuration: 5000 }

        );
        this.router.navigateByUrl("/user/view-test-results");

      }, error=>{
        this.message.error(
          `${error.error}`,
          {nzDuration: 5000}
        )
      }
    )
    }
}
