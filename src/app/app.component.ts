import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ApiService } from '../app/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  otpform:FormGroup;
  otpvalidform:FormGroup;
  google = 'mathongo-task';
  isValid=1;
  entermobile=0;
  enterotp=0;
  mobile=new FormControl('');
  otp=new FormControl('');
  isVerified=0;
  isLogin=0;
  public data2={}
  public data={}
  public info={}
  constructor(private formbuilder:FormBuilder,private authService: AuthService, private apiservice: ApiService) { }
  private user: SocialUser;
  private loggedIn: boolean;
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response)=>{
      console.log(response)
      this.isValid=0;
      this.info['name']=response.name
      this.info['email']=response.email
      this.info['isVerified']=0
      console.log(this.info)
      this.apiservice.register(this.info)
      .subscribe(
        data=>{
          console.log(data);
          if(data['status']==0){
            this.isValid=0;
            this.isVerified=1;
            this.entermobile=1;
            // console.lo
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
    let data=this.otpform.value;

    console.log("hello")
    this.data2['mobile']='919340025667';
    this.data2['otp']='8401'
    console.log(data)
    this.mobile=data['mobile']
    this.entermobile=0;
    this.enterotp=1;
    this.apiservice.send_otp(data)
      .subscribe(
        data=>{
          console.log("data=",data);
          this.entermobile=0;
          this.enterotp=1;
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
 
        // this
        error=>console.error("error",error)

      );
    }
    resendOtp() : void{
      // let data=this.otpform.value;
  
      console.log("hello")
      // this.data2['mobile']='919340025667';
      // this.data2['otp']='8401'
      // console.log(data)
      this.data2['mobile']=this.mobile
      this.apiservice.send_otp(this.data2)
        .subscribe(
          data=>{
            console.log("data=",data);
            this.entermobile=0;
            this.enterotp=1;
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
   
          // this
          error=>console.error("error",error)
  
        );
      }
    verifyOtp() : void{
      let data=this.otpvalidform.value;
      data['mobile']=this.mobile
      console.log("hello")
      this.data2['mobile']='919340025667';
      this.data2['otp']='8401'
      console.log(data)
      // this.mobile=data['mobile']
      console.log("otpverify=",data)

      this.apiservice.verify_otp(data)
        .subscribe(
          data=>{
            console.log(data);
            if(data['type']=="success"){
              data['email']=this.info['email']
              console.log(data)
              this.apiservice.verified(data)
              .subscribe(
                data=>{
                  console.log(data)
                  this.isLogin=1;
                  this.enterotp=0;
                }
              )
            }
 
          },
          error=>console.error("error",error)
        );
      }
  
  signOut(): void {
    this.isValid=1;
    this.isLogin=0;
    this.authService.signOut();
  }
  
  ngOnInit() {
    this.otpform=new FormGroup({
      mobile: new FormControl('')
    })
    this.otpvalidform=new FormGroup({
      otp: new FormControl('')
    })
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
