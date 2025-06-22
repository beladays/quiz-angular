import { Component } from '@angular/core';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service'; //retirar se for testar!

@Component({
  selector: 'app-dashboard',
  imports: [
    sharedImports
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tests= []; 
  //  tests: any[] = []; //teste!

  constructor(private notification: NzNotificationService,
    private testService: AdminService
  ){}

  /* teste!
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

/* teste!
  getAllTest() {
    this.tests = [ //teste!
      { id: 1, name: 'Quiz Matemática', totalQuestions: 10, createdAt: '2025-01-10' },
      { id: 2, name: 'Quiz História', totalQuestions: 15, createdAt: '2025-02-18' },
      { id: 3, name: 'Quiz Geografia', totalQuestions: 20, createdAt: '2025-03-05' }
    ];


    this.notification.success('Sucesso', 'Dados carregados localmente');     
  }
}
*/

  }
}