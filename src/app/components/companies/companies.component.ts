import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceAdmin } from 'src/app/services/ServiceAdmin.service';


interface local {
  _id: any;
  name: any;
  products: any;
}

 



function search(local:any,text: string, pipe: PipeTransform): local[] {
  return local.filter((local: { _id: any; name: any; products: any; }) => {
    const term = text.toLowerCase();
    return local._id.toLowerCase().includes(term)
        || pipe.transform(local.name).includes(term)
        || pipe.transform(local.products).includes(term);
  });
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers:[DecimalPipe]
})



export class CompaniesComponent implements OnInit {
  categories: any =[];
  idCategorySelected :any;
  companiesCategory:any=[];
  idCompany:any;
  productsCompany:any=[];

  compaiesCategory$!:Observable<local[]>;
  filter = new FormControl('');
  

  constructor(private modalService:NgbModal,pipe: DecimalPipe, private adminService : ServiceAdmin) {

    this.companiesCategory = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.companiesCategory,text, pipe))
    );
   }

  ngOnInit(): void {
    
    this.adminService.obtenerCategorias().subscribe(
      res =>{
        this.categories=res;
        console.log("categories: ",this.categories)
      }
      ,
      error =>{
        console.log(error);
      }
    )

  }

  changeLocals(){
    console.log("a ver",this.idCategorySelected);
    this.adminService.obtenerLocales(this.idCategorySelected).subscribe(
      res =>{
        this.companiesCategory=res.companies;
        
        console.log("companies: ",this.companiesCategory)
      }
      ,
      error =>{
        console.log(error);
      }
    )
  }

  
 

  openCompany(modal:any,idCompany:any){

    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:false
      }
    );
}
  
}
