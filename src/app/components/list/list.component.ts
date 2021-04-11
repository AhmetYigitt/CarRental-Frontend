import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  cars: CarDetail[] = [];
  currentChoice: string;
  tempBrand: string = 'tempBrand';
  tempCar: string = 'tempCar';
  tempColor: string = 'tempColor';

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.getColors();
    this.getBrands();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  setCurrentChoice(choice: string) {
    this.currentChoice = choice;
  }

  getCurrentClass(choice: string) {
    if (choice == this.currentChoice) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  deleteColor(color: Color) {
    this.colorService.delete(color).subscribe((response) => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  deleteCar(CarDetail: CarDetail) {
    this.carService.getCarById(CarDetail.carId).subscribe((response1) => {
      this.carService.delete(response1.data).subscribe(
        (response2) => {
          this.toastrService.success(response2.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    });
  }
  deleteBrand(brand: Brand) {
    this.brandService.delete(brand).subscribe((response) => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 750);
    });
  }
}
