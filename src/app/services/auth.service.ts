import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginmodel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponsemodel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44356/api/auth/'
  private userApiUrl='https://localhost:44356/api/users/'



  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService
  ) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponsemodel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  isAuthenticated():boolean{
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }
  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponsemodel<TokenModel>>(this.apiUrl+"register",registerModel)
  }

  getCurrentUserByEmail(email?:string){
     return this.httpClient.get<SingleResponsemodel<User>>(this.userApiUrl+"getbymail?email="+email)
  }
}
