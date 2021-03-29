import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalAdd } from '../models/rental-add';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'https://localhost:44356/api/rentals';
  constructor(private httpClient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"/getrentaldetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRentals(rentalAdd:RentalAdd):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/add"
    return this.httpClient.post<ResponseModel>(newPath,rentalAdd)
  }

  checkCarRentDates(rental:RentalAdd):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/checkcarrentdate"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
