import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

Amplify.configure({
  Auth:{
    region: 'us-east-2',
    userPoolId : 'us-east-2_nQjXDNgXM',
    userPoolWebClientId : '72mhf4835o3o7hni5am5fckv16',
    oauth: {
      domain: "https://adpapiauth.auth.us-east-2.amazoncognito.com",
      flows: ["Implicit grant"],
      scope: ["openid"],
      redirectSignIn: "https://www.google.com",
      redirectSignOut: "",
      responseType: "token"
  }
  }
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css', './login.component.scss']
})

export class LoginComponent implements OnInit {
 
    title = "Passenger Re-accom Manager";
    submitted = false;
    invalid = false;
    errorMsg = "";

    form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  
 
    constructor(private route: ActivatedRoute, private router: Router, 
                private userService : UserService) {
    }

    ngOnInit(): void {
      localStorage.removeItem("LoggedInUser");
    }

    get f(){

      return this.form.controls;

    }

    submit():void {
        
        this.submitted = true;

        if (this.form.valid) {
          var userName = this.form.value["userName"]
          var usernamesplitter = userName.split("/")[0] + "/" + userName.split("/")[1]
          console.log(usernamesplitter)
                
          Auth.signIn(usernamesplitter, this.form.value["password"]).then(user =>{
            if(user.challengeName === 'NEW_PASSWORD_REQUIRED'){
              console.log('Password change required')
              this.router.navigate(['']);
              this.invalid = true;
              this.errorMsg = user.ResponseText;
            }else{
              var tokens = user.signInUserSession
              console.log(tokens)
              var accessToken = tokens.accessToken.jwtToken
              var idToken = tokens.idToken.jwtToken
              var refreshToken = tokens.refreshToken.token
              var userData = localStorage.getItem("CognitoIdentityServiceProvider.72mhf4835o3o7hni5am5fckv16.subham123.userData")
              var lastAuthUser = localStorage.getItem("CognitoIdentityServiceProvider.72mhf4835o3o7hni5am5fckv16.LastAuthUser")
              localStorage.setItem('accessToken',JSON.stringify(accessToken))
              localStorage.setItem('idToken',JSON.stringify(idToken))
              localStorage.setItem('refreshToken',JSON.stringify(refreshToken))
              localStorage.setItem('userData',JSON.stringify(userData))
              localStorage.setItem('lastAuthUser',JSON.stringify(lastAuthUser))
              this.router.navigate(['/scmlanding']);
              // localStorage.clear()
            }
          });
          this.userService.login(this.form.value["userName"], this.loginCallBack.bind(this));
        }  
    } 

      loginCallBack(user : User) : void {
        
        if (user.HDRResponseCode === "000") {
            
            user.setUser();
          
        } else {
          this.invalid = true;
          this.errorMsg = user.ResponseText;
          //this.openSnackBar(user.ResponseText, "X");
        } 
      }

}

