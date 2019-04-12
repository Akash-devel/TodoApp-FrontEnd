import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/socket.service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {

  constructor(public socketService: SocketService, public appService: AppService, public toastr: ToastrService,
              public cookieService: CookieService, public router: Router) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:member-ordering
  public LogOut: any = () => {

    this.appService.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {

        console.log('Logout called');
        this.router.navigate(['/']);
      }
    });
  }

  // tslint:disable-next-line:no-unused-expression
  public goToCreateTask: any = () => {

    this.router.navigate(['/createTask']);
  }
}
