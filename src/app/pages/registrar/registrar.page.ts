import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  regForm: FormGroup | undefined;
  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService,public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname : ['', [Validators.required]],
      email : ['', [  
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      ]],
      password:['',[ 
        Validators.required,
        Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"),
      ]]
    })
  }
  get errorControl(){
    return this.regForm?.controls;
  }
  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error) =>{
        console.log(error);
        loading.dismiss()
      })
      
      if(user){
        loading.dismiss()
        this.router.navigate(['/login'])
      }else{
        console.log('coloque as coisas certas')
        loading.dismiss()
      }
    }
  }
}
