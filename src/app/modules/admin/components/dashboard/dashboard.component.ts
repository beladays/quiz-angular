import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/auth/signup/shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    SharedModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tests= [];

  constructor(private notification: NzNotificationService,
    private testService: AdminService
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
