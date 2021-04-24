import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

 currentUser?:User
  
  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService
  ) { }
  
  ngOnInit(): void {
  }

 

  isAuthenticated(){
    if (this.authService.isAuthenticated()) {
      return true;
    }else{
      return false
    }
  }

  logout(){
    
    this.localStorageService.remove("token");
    this.localStorageService.removeCurrentUser();
  }

  getCurrentUser():User{
   return this.localStorageService.getCurrentUser();
  }


}
