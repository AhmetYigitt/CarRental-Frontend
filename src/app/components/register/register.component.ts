import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let registerModel=Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe((response)=>{
        this.toastrService.success(response.message);
        setTimeout(() => {
          this.router.navigate([""])
        }, 750);
      },(errorResult)=>{
        this.toastrService.error(errorResult.error)
      })
    }else{
      this.toastrService.warning("formunuz eksik");
    }
  }
}
