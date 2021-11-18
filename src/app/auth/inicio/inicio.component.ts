import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceAdmin } from 'src/app/services/ServiceAdmin.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{
  submited : boolean = false;

  onSubmit(){
    this.submited=true;
    if(!this.loginForm.valid){
      return;
    }
  }
  ngOnInit():void {}


  loginForm : FormGroup;

  
  constructor(private formBuilder:FormBuilder,private router:Router, private serviceAdmin:ServiceAdmin) {

    this.loginForm =this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl ('',Validators.required)
    });
  }

  get loginUsuario () {
    return this.loginForm.controls; 
  }

  login(){
    const {email,password} = this.loginForm.value;
    this.serviceAdmin.login(email,password).subscribe(res =>{
      if(res){
        console.log("entro")
        this.router.navigateByUrl('/admin/orders');
      }else {
        alert("datos invalidos");
      }  
    })



  }
}
