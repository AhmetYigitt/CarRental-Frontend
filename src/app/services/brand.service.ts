import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponsemodel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  
  private apiUrl = 'https://localhost:44356/api/brands/';
  constructor(private httpClient: HttpClient) {}
  getBrands(): Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }

  add(brand:Brand){
    return this.httpClient.post(this.apiUrl+"add",brand)
  }
  delete(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",brand);
  }
  getById(brandId:number):Observable<SingleResponsemodel<Brand>>{
    return this.httpClient.get<SingleResponsemodel<Brand>>(this.apiUrl+"getbyid?id="+brandId);
  }
  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",brand);
  }
}
