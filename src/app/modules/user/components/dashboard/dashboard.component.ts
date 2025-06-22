import { Component } from '@angular/core';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TestService } from '../../services/test.service'; //se for testar retirar!

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    sharedImports
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    tests= [];

    constructor(private notification: NzNotificationService,
      private testService: TestService
    ){}

   /* teste
     constructor(private notification: NzNotificationService) {} //teste!

    ngOnInit(){
    this.getAllTest();
  }
*/
  getAllTest(){
    this.testService.getAllTest().subscribe(res=>{
     this.tests = res;
    }, error=>{
      this.notification
      .error(
        'ERROR',
       `Algo deu errado. Tente novamente`,
        {nzDuration: 5000}
      )
    }
  )
  }
}

/* teste:
  getAllTest() { 
    this.tests = [
      { id: 1, name: 'Quiz Matemática', totalQuestions: 10, description: 'Teste sobre matemática básica' },
      { id: 2, name: 'Quiz História', totalQuestions: 15, description: 'Teste sobre história mundial' },
      { id: 3, name: 'Quiz Geografia', totalQuestions: 20, description: 'Teste sobre geografia global' }
    ];

    this.notification.success('Sucesso', 'Dados carregados localmente'); //teste!
  }
}
*/


