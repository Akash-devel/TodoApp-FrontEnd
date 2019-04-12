import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'http://localhost:3000';
  private apiKey = 'AmsbuaehqXa1985vsvabbsalYQVVBIAMNgOInfgINg1s387AsaIAhNSNALNOIQH3NaA';

  public objCountryName: object;

  constructor(public http: HttpClient, public cookieService: CookieService) { }

  public getCountryNamesJSON(): Observable<any> {
    return this.http.get('./../assets/CountryNames.json');
  }  // end getCountryNamesJSON()

  public getCountryPhoneJSON(): Observable<any> {
    return this.http.get('./../assets/CountryPhone.json');
  } // end getCountryPhoneJSON()

  public getUserInfoFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data));
  } // end setUserInfoInLocalStorage

  public signupFunction(signUpdata): Observable<any> {

    const params = new HttpParams()
      .set('firstName', signUpdata.firstName)
      .set('lastName', signUpdata.lastName)
      .set('email', signUpdata.email)
      .set('countryISDCode', signUpdata.countryISDCode)
      .set('mobileNumber', signUpdata.mobile)
      .set('password', signUpdata.password)
      .set('apiKey', this.apiKey);

    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  } // end of signupFunction

  public loginFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of loginFunction function

  public forgotpwd(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email);

    return this.http.post(`${this.url}/api/v1/users/forgotPwd`, params);
  } //  end of forgotpwd function

  public changePassword(pwdData): Observable<any> {

    const params = new HttpParams()
      .set('newPassword', pwdData.newPassword);

    return this.http.post(`${this.url}/api/v1/users/change-password/:tokenId`, params);
  } //  end of changePassword function

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('apiKey', this.cookieService.get('apiKey'));

    return this.http.post(`${this.url}/api/v1/users/logout`, params);
  } // end logout function

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, Error Message is: ${err.message}`;

    } // end condition if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  } // End HandleError
}
