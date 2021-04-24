import { Component, OnInit } from '@angular/core';
import{ FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NaviComponent } from '../navi/navi.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  currentUser?:User

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStrorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
    
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe((response)=>{
        this.toastrService.info(response.message)
        this.localStrorageService.setItem("token",response.data.token);
        this.authService.getCurrentUserByEmail(loginModel.email).subscribe(response=>{
          this.localStrorageService.setCurrentUser(response.data)
          
        })
        setTimeout(() => {
          this.router.navigateByUrl("/")
        }, 500);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

}
