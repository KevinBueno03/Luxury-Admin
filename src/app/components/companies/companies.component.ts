import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceAdmin } from 'src/app/services/ServiceAdmin.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers:[DecimalPipe,NgbRatingConfig]
})



export class CompaniesComponent implements OnInit {
  categories: any =[];
  idCategorySelected :any;
  companiesCategory:any=[];
  idCompany:any;
  productsCompany:any=[];
  company:any;
  currentRate = 0;
  newRate:any;

  //productthings
  myActive:any;
  body:any;

 
//capfilethings
  public previsualizacionLogo!: string;
  public previsualizacionImg!: string;
  public archivos: any = [];
  public loading!: boolean;
  
  public image = '';
  public logo = '';



 //companyThings
  name:any;
  

  formAddCompany = this._formBuilder.group({
    companyName : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    img : new FormControl('',[Validators.required]),
    logo : new FormControl('',[Validators.required]),
  });

  formAddProduct = this._formBuilder.group({
    name : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required]),
    price : new FormControl('',[Validators.required,Validators.minLength(1)]),
    img : new FormControl('',[Validators.required]),
    
  });

    formAddCategory = this._formBuilder.group({
      categoryName : new FormControl('',[Validators.required]),
    })


  constructor(private modalService:NgbModal,pipe: DecimalPipe, private adminService : ServiceAdmin
    ,private sanitizer: DomSanitizer ,private _formBuilder :FormBuilder ,private stars: NgbRatingConfig, private starsAdd: NgbRatingConfig) {
      stars.max = 5;
     

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
  get formAddCompanyget () {
    return this.formAddCompany.controls; 
  }
  get formAddCategoryget(){
    return this.formAddCategory.controls;
  }
  get formAddProductget(){
    return this.formAddProduct.controls;
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



    this.idCompany= idCompany;
    console.log("Antes de buscar que pedos")
      this.adminService.obtenerCompany(idCompany).subscribe(
        res => {

          this.company = res;
          this.currentRate = res.calification;
          console.log("company", this.company);
        },

        error => {
          console.log(error);
        }
      )

    console.log(this.idCompany);
    this.adminService.obtenerProductos(idCompany).subscribe(
      res =>{
        this.productsCompany=res.products;

        console.log("products: ",this.productsCompany)
      }
      ,
      error =>{
        console.log(error);
      }
    )

    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:false
      }
    );
}

  openAddCategory(modal:any){
    

    this.modalService.open(
      modal,
      {
        size:'l',
        centered:false
      }
    );
}
  openAddCompany(modal:any){
    

    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:false
      }
    );
}
openAddProduct(modal:any){
    

  this.modalService.open(
    modal,
    {
      size:'l',
      centered:false
    }
  );
}



  saveCompany(){
    let newCompany ={
      'name':this.formAddCompany.get('companyName')!.value,
      'description':this.formAddCompany.get('description')!.value,
      'address':this.formAddCompany.get('address')!.value,
      'logo':this.formAddCompany.get('logo')!.value,
      'img':this.formAddCompany.get('img')!.value,
    }

   
    this.adminService.guardarCompany(newCompany,this.idCategorySelected).subscribe(
      res =>{
      
        console.log("Guardada")
        this.adminService.obtenerLocales(this.idCategorySelected).subscribe(
          res =>{
            this.companiesCategory=res.companies;
            
            console.log("companies: ",this.companiesCategory)
            this.archivos = [];
            this.previsualizacionImg="";
            
          }
           ,
          error =>{
            console.log(error);
          }
        )
        
      }
      
      
    )

    this.modalService.dismissAll();
  }

   saveProduct(){
    var newProduct ={
      'name':this.formAddProduct.get('name')!.value,
      'description':this.formAddProduct.get('description')!.value,
      'price':this.formAddProduct.get('price')!.value,
      'img':this.formAddProduct.get('img')!.value,
    }
    
    console.log("newProduct",newProduct);
    this.adminService.guardarProducto(newProduct,this.idCompany).subscribe(
      res =>{
      
        console.log("Guardada")
         this.adminService.obtenerProductos(this.idCompany).subscribe(
          res =>{
            this.productsCompany=res.products;
            console.log("Productos: ",this.productsCompany)
            this.archivos = [];
            this.previsualizacionImg="";
          }
          ,
          error =>{
            console.log(error);
          }
        )
        
        
      }
      ,
      error =>{
        console.log(error);
      }
    )
    
  }

   saveCategory(){

    var newCategory ={
      'name':this.formAddCategory.get('categoryName')!.value,
      'img':this.image
    }

    console.log("newCategory",newCategory);

    this.adminService.guardarCategoria(newCategory).subscribe(
      
      res =>{
      
        console.log("Guardada")
         this.adminService.obtenerCategorias().subscribe(
          res =>{
            this.categories=res;
            console.log("categories: ",this.categories)
            this.modalService.dismissAll();
            this.archivos = [];
            this.previsualizacionImg="";
            this.previsualizacionLogo="";
          }
          ,
          error =>{
            console.log(error);
          }
        )
        
        
      }
      ,
      error =>{
        console.log(error);
      }
    )
    
  }


search(){
    if(this.name ==""){
      this.changeLocals();
    }else{
      this.companiesCategory = this.companiesCategory.filter((res: { name: string; })=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }
  }

  ////
  async capturarFile(event: any,toWhatForm:any,whatFile:any) {
    this.archivos = [];

    if(toWhatForm=='addCompany'){
      if(whatFile=='logo'){

        const archivoCapturado = event.target.files[0]
        await this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacionLogo = imagen.base;
          this.logo = imagen.base;
          this.formAddCompany.controls['logo'].setValue(this.logo);
        })
        this.archivos.push(this.logo);
        console.log(this.archivos);
      }else if(whatFile=='img'){
        const archivoCapturado = event.target.files[0]
        await this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacionImg = imagen.base;
          this.image = imagen.base;
          this.formAddCompany.controls['img'].setValue(this.image);
        })
        this.archivos.push(this.image);
        console.log(this.archivos);

      }

    }else if(toWhatForm=='addProduct'){
      this.archivos = [];
      this.previsualizacionImg = ''
      const archivoCapturado = event.target.files[0]
        await this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacionImg = imagen.base;
          this.image = imagen.base;
          this.formAddProduct.controls['img'].setValue(this.image);
        })
        this.archivos.push(this.image);
        console.log("Product img",this.archivos);

    }else if(toWhatForm=='addCategory'){
      this.archivos = [];
      this.previsualizacionImg = ''
      const archivoCapturado = event.target.files[0]
        await this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacionImg = imagen.base;
          this.image = imagen.base;
          this.formAddProduct.controls['img'].setValue(this.image);
        })
        this.archivos.push(this.image);
        console.log("Product img",this.archivos);

    }
    console.log(this.formAddCompany);
}


  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return resolve;
    } catch (e) {
      return null;
    }
  })
  /**
   * Limpiar imagen
   */

  clearImage(): any {
    this.previsualizacionLogo = '';
    this.previsualizacionImg = '';
    this.archivos = [];
  }
  //formaddCompany
  

  cambiarActive(active:boolean,id:any,nombreProducto:any){
    if(active===true){

      this.myActive=false;
      this.body={active: this.myActive};
      console.log("tiempo");
      this.adminService.updateProducto(id,this.body).subscribe(res=>{
      
        if(res){
          Swal.fire('Cambio estado producto', 'El producto '+nombreProducto+' está desactivado ahora', 'info');
        }else{
          //mostrar mensaje de error
          Swal.fire('Error', 'El producto '+nombreProducto+' no se cambio el estado', 'error');
          
        }
      });

      //this._router.navigateByUrl('/admin/listar-doctores');
    }else if(active===false){
     // active=true;
      this.myActive=true;
      this.body={active: this.myActive};

      this.adminService.updateProducto(id,this.body).subscribe(res=>{
        
        if(res){
          Swal.fire('Cambio estado producto', 'El producto '+nombreProducto+' está activado ahora', 'success');
        }else{
          //mostrar mensaje de error
          Swal.fire('Error', 'El producto '+nombreProducto+' no se cambio el estado', 'error');
        }
      });
      //this._router.navigateByUrl('/admin/listar-doctores');
    }
    //this.body={active: active};

  }

  cambioPuntaje(id:any,rating:any){
    
    console.log(this.currentRate);

    
    this.generarCambio(id,rating)
      
  }

  generarCambio(id:any,rating:any){

    console.log(rating);
    this.body={calification: rating};
      console.log(this.body);
      this.adminService.updateCompany(id,this.body).subscribe(res=>{
        
        if(res){
          Swal.fire('Cambio Calificacion Tienda', 'La caificaion fue cambiada' , 'success');

        }else{
          //mostrar mensaje de error
          Swal.fire('Error', 'No se cambio la calificacion' , 'error');
        }
      });
  }

}
