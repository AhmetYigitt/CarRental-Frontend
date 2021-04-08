import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalAdd } from 'src/app/models/rental-add';
import { CarDetailByIdService } from 'src/app/services/car-detail-by-id.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  dataLoaded = false;
  rentDate: Date;
  returnDate: Date;
  car: CarDetail={brandName:"",imagePath:"", colorName:"",dailyPrice:0,description:"",modelYear:0, carId:0};
  customerId: number;
  customers: Customer[];
  totalAmaount: number;

  constructor(
    private rentalService: RentalService,
    private carDetailByIdService: CarDetailByIdService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailById(params['id']);
        this.getCustomerDetails();
      }
    });
  }

  getCarDetailById(id: number) {
    this.carDetailByIdService.getCarDetailById(id).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  carRentalRequest(car: CarDetail) {
    let rentalCar: RentalAdd = {
      CarId: car.carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };

     this.rentalService.checkCarRentDates(rentalCar).subscribe((response)=>{

      let date1 = new Date(this.returnDate.toString());
    let date2 = new Date(this.rentDate.toString());
    let difference = date1.getTime() - date2.getTime();
    let numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
    this.totalAmaount = numberOfDays * car.dailyPrice;

    this.paymentService.setRental(rentalCar, this.totalAmaount, this.car);
    this.router.navigate(['/payments']);

    },(error)=>{
      this.toastrService.error("seçilen tarihler arasında kiarlama yapılamaz");
    })

  }

  
}
