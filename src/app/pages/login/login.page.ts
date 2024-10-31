import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup | undefined;
  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:Auth) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email : ['', [  
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      ]],
      password:['',[ 
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
      ]]
    })
  }
  get errorControl(){
    return this.loginForm?.controls;
  }
  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.loginForm?.valid){
      //const user = await this.authService.registerUser(email,password)
    }

  }
}

