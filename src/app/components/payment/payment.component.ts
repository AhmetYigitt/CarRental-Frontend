import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { RentalAdd } from 'src/app/models/rental-add';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  car: Car
  carToBeRented:RentalAdd;
  payment:Payment;

 

  cardName:string="";
  cardNumber:string="";
  cardDateMonth:string="";
  cardDateYear:string="";
  cardDate:string="";
  cardCvv:string="";
  amountPaye:number=0;

  constructor(private paymentService:PaymentService, private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {

    this.carToBeRented = this.paymentService.rentedCar;
    this.amountPaye = this.paymentService.totalAmaount
    this.car=this.paymentService.car;
  }

  addPayment(){

    this.cardDate = this.cardDateMonth + "/" + this.cardDateYear;
    this.payment = {
      cardNameSurname : this.cardName,
      cardNumber : this.cardNumber,
      cardExpiryDate : this.cardDate,
      cardCvv : this.cardCvv,
      amountPaye : this.amountPaye
    }

    console.log(this.payment);

    this.paymentService.addPayment(this.payment).subscribe((response)=>{
      this.toastrService.success("ödeme başarılı");

      this.rentalService.addRentals(this.carToBeRented).subscribe((response2)=>{
        this.toastrService.success("kiaralama başarılı");
      },(error)=>{
        this.toastrService.error("kiaralama başarısız");
      })
    },(error2)=>{
      this.toastrService.error("ödeme başarısız");
    })
  }

}
