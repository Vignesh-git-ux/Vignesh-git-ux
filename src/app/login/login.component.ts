import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css', './login.component.scss']
})

export class LoginComponent implements OnInit {
 
    title = "Schedule Change Manager";
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
            this.userService.login(this.form.value["userName"], this.form.value["password"], this.loginCallBack.bind(this));
            
        }
    } 

    loginCallBack(user : User) : void {
      
      if (user.HDRResponseCode === "000") {
          
          user.setUser();
          this.router.navigate(['/scmlanding']);
      } else {
        this.invalid = true;
        this.errorMsg = user.ResponseText;
        //this.openSnackBar(user.ResponseText, "X");
      } 
    }
}
