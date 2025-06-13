import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/auth/signup/shared/shared.module';
//import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-view-my-test-results',
  imports: [
    SharedModule
  ],
  templateUrl: './view-my-test-results.component.html',
  styleUrl: './view-my-test-results.component.css'
})
export class ViewMyTestResultsComponent {

  dataSet: any;

 // constructor(private testService: TestService){}
    constructor() {} //teste!


  ngOnInit(){
    this.getTestResults();
  }

 // getTestResults(){
 //   this.testService.getMyTestResults().subscribe(res=>{
 //     this.dataSet = res;
 //     console.log(this.dataSet);
 //   })
  getTestResults(){ //teste!
    this.dataSet = [
      { testName: 'Quiz Matemática', totalQuestions: 10, correctAnswers: 7, percentage: 70 },
      { testName: 'Quiz História', totalQuestions: 15, correctAnswers: 13, percentage: 86 },
      { testName: 'Quiz Geografia', totalQuestions: 20, correctAnswers: 18, percentage: 90 }
    ];

    console.log(this.dataSet);
  }
}

