import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  colorUpdateForm : FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getColor(params["colorId"])
      }
    })
  }


  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["",Validators.required]
    })
  }

  getColor(colorId:number){
    this.colorService.getById(colorId).subscribe((response) => {
      this.color = response.data;
    });
  }

  update(){
    if(this.colorUpdateForm.valid){      
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      colorModel.id = Number(this.color.id)
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        this.toastrService.success(responseError.message)
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }    
  }

}
