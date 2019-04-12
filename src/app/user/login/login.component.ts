import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(public router: Router, public cookieService: CookieService, public appService: AppService,
    public toastr: ToastrService) { }

  ngOnInit() {
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);
  } // end goToSignUp

  public loginFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('Email Left Blank!');

    } else if (!this.password) {
      this.toastr.warning('Password Left Blank!');

    } else {

      const data = {
        email: this.email,
        password: this.password
      };

      this.appService.loginFunction(data).subscribe((apiResponse) => {

        if (apiResponse.status === 200) {

          console.log(apiResponse);
          this.cookieService.set('authToken', apiResponse.data.authToken);
          this.cookieService.set('receiverId', apiResponse.data.userDetails.userId);
          this.cookieService.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);

          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);

          this.router.navigate(['/Dashboard']);

        } else {

          this.toastr.error(apiResponse.message);
        }
      }, (err) => {

        this.toastr.error('Some Error Occurred');
      });
    }
  } // end loginFunction

  public goToForgotPwd: any = () => {

    if (this.email === null || this.email === undefined) {
      this.toastr.warning('Please provide the email');
    } else {
      this.appService.forgotpwd(this.email).subscribe(() => {

        this.toastr.info('A mail has been sent to your registered mail id');
      });
    } // end goToForgotPwd
  }
}
