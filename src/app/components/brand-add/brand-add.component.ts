import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
    brandName: ['', Validators.required],
  });
}

  add(){

    if(this.brandAddForm.valid){
      let brandModule= Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandModule).subscribe((response)=>{
        this.toastrService.success("Marka başarılı bir şekilde eklendi");
      })
      
    }else{
      this.toastrService.error("Formunuz eksik");
    }
    
    
  }
}
