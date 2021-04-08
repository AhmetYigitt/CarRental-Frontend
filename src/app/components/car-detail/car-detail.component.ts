import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailByIdService } from 'src/app/services/car-detail-by-id.service';
import { CarImagesByIdService } from 'src/app/services/car-images-by-id.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails: CarDetail;
  carImages:CarImage[]=[];

  constructor(private carDetailByIdService: CarDetailByIdService,
    private carImagesByIdService: CarImagesByIdService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarDetailById(params["id"])
        this.getImagesById(params["id"])
      }
    })
  }

  getCarDetailById(id: number){
    this.carDetailByIdService.getCarDetailById(id).subscribe(response=>{
      this.carDetails= response.data[0];
    })
  }

  getImagesById(id: number){
    this.carImagesByIdService.getCarImagesById(id).subscribe(response=>{
      this.carImages=response.data;
    })
  }
}
