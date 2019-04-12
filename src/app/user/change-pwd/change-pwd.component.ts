import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {

  public inputNewPwd: any;
  public confirmPwd: any;

  constructor(public router: Router, public toastr: ToastrService, public appService: AppService) { }

  ngOnInit() {
  }

  public submitPwdFunction: any = () => {

    const pwdData = {
        newPassword: this.inputNewPwd,
        confrimPassword: this.confirmPwd
    };

    if (pwdData.newPassword !== pwdData.confrimPassword) {
      this.toastr.error('Password not matched');
    }
  }
}
