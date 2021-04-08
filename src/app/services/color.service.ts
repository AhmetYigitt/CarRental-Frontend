import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { SingleResponsemodel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = 'https://localhost:44356/api/colors/';

  constructor(private httpClient: HttpClient) {}
  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall");
  }

  add(color:Color){
    return this.httpClient.post(this.apiUrl+"add",color)
  }
  delete(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",color);
  }
  getById(colorId:number):Observable<SingleResponsemodel<Color>>{
    return this.httpClient.get<SingleResponsemodel<Color>>(this.apiUrl+"getbyid?id="+colorId);
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",color);
  }
}
