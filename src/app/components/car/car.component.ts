import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarDetail[]= [];
  dataLoaded=false;
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, 
    private toastrService:ToastrService) { }
  filterText="";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params['colorId']&&params['brandId']){
        this.getCarsByBrandAndColor(params['colorId'],params['brandId']);
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars();
      }
    })
  }

  getCars(): void {
    this.carService.getCars().subscribe((response)=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByBrand(brandId:number): void {
    this.carService.getCarsByBrand(brandId).subscribe((response)=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByColor(colorId: number): void {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByBrandAndColor(brandId:number,colorId:number):void{
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

}
