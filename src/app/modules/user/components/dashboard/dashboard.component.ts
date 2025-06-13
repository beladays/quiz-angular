import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/auth/signup/shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    tests= [];

    constructor(private notification: NzNotificationService,
      private testService: TestService
    ){}

    ngOnInit(){
    this.getAllTest();
  }

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


