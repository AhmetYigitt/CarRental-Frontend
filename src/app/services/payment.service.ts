import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { Payment } from '../models/payment';
import { RentalAdd } from '../models/rental-add';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rentedCar:RentalAdd
  totalAmaount:number;
  car:Car

  apiUrl="https://localhost:44356/api/payments/"

  constructor(private httpClient:HttpClient) { }



  setRental(rentedCar:RentalAdd, totalAmaount:number, car:Car){
    this.rentedCar=rentedCar;
    this.totalAmaount=totalAmaount
    this.car=car
  }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}
