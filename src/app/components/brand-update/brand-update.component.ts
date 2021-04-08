import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand
  brandUpdateForm:FormGroup;

  constructor(
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();

    this.activatedRoute.params.subscribe((response)=>{
      this.getBrand(response["brandId"])
    })
    
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ["",Validators.required]
    })
  }

  getBrand(brandId:number){
    this.brandService.getById(brandId).subscribe((response)=>{
      this.brand=response.data;
    })
    
  }

  update(){
    if(this.brandUpdateForm.valid){      
      let brandModel = Object.assign({},this.brandUpdateForm.value)
      brandModel.id = Number(this.brand.id)
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        this.toastrService.success(responseError.message)
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }    
  }
}
