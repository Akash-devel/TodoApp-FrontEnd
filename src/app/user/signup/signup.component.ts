import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public objCountryName: object;

  public inputFirstName: any;
  public inputLastName: any;
  public inputEmail: any;
  public inputCountry: any;
  public inputMobile: any;
  public inputPassword: any;
  public CountryArray: string[];
  public objCountryPhoneCode: object;
  public CountryISDCode: any;
  public CountryShortName: any;
  public index: number;

  constructor(public router: Router, public appService: AppService, public toastr: ToastrService) {

    appService.getCountryNamesJSON().subscribe(data => {
      // console.log(data);
      this.objCountryName = data as object;
      // console.log(this.objCountryName);

      this.CountryArray = Object.values(this.objCountryName);
      this.inputCountry = this.CountryArray[0];
    });

    appService.getCountryPhoneJSON().subscribe(data => {
      this.objCountryPhoneCode = data as object;
    });
  }

  ngOnInit() {
    this.index = 0;
  }

  public gotoLogin: any = () => {

    this.router.navigate(['/login']);
  }

  // Function sets Country ISD code on selection of Country Name
  public onChangeCountry: any = () => {

    // console.log(propValue);
    this.CountryISDCode = 0;

    // Finds the Country short names
    for (const prop in this.objCountryName) {

      if (this.objCountryName[prop] === this.inputCountry) {

        this.CountryShortName = prop;
        if (this.CountryShortName !== '0') {
          this.index = 1;
        } else {
          this.index = 0;
        }
        break;
      }
    }
    //   console.log(this.CountryISDCode); // short name of country
    // Finds the Country ISD codes
    for (const code in this.objCountryPhoneCode) {

      if (code === this.CountryShortName) {

        this.CountryISDCode = this.objCountryPhoneCode[code];
        break;
      }
    }

    //    console.log(this.CountryISDCode);
  } // end onChangeCountry

  public signupFunction: any = () => {

    if (this.index === 0) {

      this.toastr.warning('Please select a country');
    } else {

      const data = {
        firstName: this.inputFirstName,
        lastName: this.inputLastName,
        email: this.inputEmail,
        countryISDCode: this.CountryISDCode,
        mobile: this.inputMobile,
        password: this.inputPassword,
      };

      console.log(data);

      this.appService.signupFunction(data).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Signup Successful');

          setTimeout(() => { this.gotoLogin(); }, 2000);

        } else {

          this.toastr.error(apiResponse.message);
        }
      }, (err) => {

        this.toastr.error('Some Error Occured');

      });
    }
  }  // end signupFunction
}
