import { Component } from '@angular/core';
import { sharedImports, } from '../../../shared/auth/signup/shared/shared.module';
import { AdminService } from '../../services/admin.service'; // retirar se for testar!

@Component({
  selector: 'app-view-test-results',
  imports: [
    sharedImports
  ],
  templateUrl: './view-test-results.component.html',
  styleUrl: './view-test-results.component.css'
})
export class ViewTestResultsComponent {

  resultsData: any;

  constructor(private testService: AdminService){}

  /* teste!
    constructor() {} //teste!
  ngOnInit(){
    this.getTestResults();
  }
*/

  getTestResults(){
    this.testService.getTestResults().subscribe(res=>{
      this.resultsData = res;
      console.log(this.resultsData);
    })

  /* teste!
  getTestResults(){
    this.resultsData = [ //teste!
      { testName: 'Quiz Matemática', totalQuestions: 10, correctAnswers: 7, percentage: 70, userName: 'Carlos' },
      { testName: 'Quiz História', totalQuestions: 15, correctAnswers: 13, percentage: 86, userName: 'Ana' },
      { testName: 'Quiz Geografia', totalQuestions: 20, correctAnswers: 18, percentage: 90, userName: 'Maria' }
    ];
    console.log(this.resultsData);
  }
}

*/
  }
}