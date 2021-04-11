import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key:string, token:string){
    localStorage.setItem(key,token)
  }
  remove(key:string){
    localStorage.removeItem(key);
  }
}
