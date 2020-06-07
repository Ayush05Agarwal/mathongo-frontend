import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {
  google = 'mathongo-task';
  isValid=1;
  isVerified=0;
  isLogin=0;
  public data={}
  constructor(private authService: AuthService, private apiservice: ApiService) { }
  private user: SocialUser;
  private loggedIn: boolean;
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response)=>{
      console.log(response)
      this.isValid=0;
      this.data['name']=response.name
      this.data['email']=response.email
      this.data['isVerified']=0
      console.log(this.data)
      this.apiservice.register(this.data)
      .subscribe(
        data=>{
          console.log(data);
          if(data['status']==0){
            this.isValid=0;
            this.isVerified=1;
          }
          else{
            this.isValid=0;
            this.isVerified=0;
            this.isLogin=1;
          }
        },
        error=>console.error("error",error)
      );
    }
  );
  }
 
  sendOtp() : void{
    this.data['mobile']=919340025667;
    this.apiservice.send_otp(this.data)
      .subscribe(
        data=>{
          console.log(data);
          // if(data['status']==0){
          //   this.isValid=0;
          //   this.isVerified=1;
          // }
          // else{
          //   this.isValid=0;
          //   this.isVerified=0;
          //   this.isLogin=1;
          // }
        },
        error=>console.error("error",error)
      );
    }
  
  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
