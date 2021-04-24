import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  currentUser:string='currentUser'

  constructor() { }


  setItem(key:string, token:string){
    localStorage.setItem(key,token)
  }
  remove(key:string){
    localStorage.removeItem(key);
  }
  setCurrentUser(currentUserValue:User) {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
  }
  
  getCurrentUser(): User {
    var user = JSON.parse(localStorage.getItem(this.currentUser)|| "");
    return user;
  }
  
  removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }
}
