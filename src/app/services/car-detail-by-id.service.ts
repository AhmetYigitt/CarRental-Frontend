import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/car-detail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailByIdService {

  apiUrl="https://localhost:44356/api/"

  constructor(private httpClient: HttpClient) { }

  getCarDetailById(id: number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getcardetail?carId="+id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
