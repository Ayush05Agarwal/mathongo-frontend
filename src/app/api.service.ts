import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
// import {Http,Headers} from 'angular/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient, private router: Router) { }
  public baseUrl="http://localhost:3001/";
  public sendOtp="https://api.msg91.com/api/v5/otp?authkey=249505ASv2BqIyabL5edc67a1P1&template_id=5ed35c99d6fc051b31515068&mobile="
  public verifyOtp="https://api.msg91.com/api/v5/otp/verify?authkey=249505ASv2BqIyabL5edc67a1P1&mobile="


  register(data){
    return this.http.post(this.baseUrl+"register",data);
  }
  send_otp(data){
 
      return this.http.get(this.sendOtp+data['mobile'],data)
  }
  verify_otp(data){
    return this.http.post(this.baseUrl+"sendotp",data)
  }
  verified(data){
    return this.http.put(this.baseUrl+"verified",data)
  }
}
