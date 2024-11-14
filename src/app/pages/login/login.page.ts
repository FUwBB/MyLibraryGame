import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', 
        [Validators.required, 
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      ]],
      password: ['', 
        [Validators.required, 
        Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"),
      ]]
    });
  }
  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.loginForm?.valid) {
      const user= await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).catch((error)=>{ 
        console.log(error);
        loading.dismiss()
      })
        if (user) {
          loading.dismiss();
          this.router.navigate(['/index']);
        }
    } else {
      console.log ("bad")
      loading.dismiss();
    }
  }
  get errorControl() {
    return this.loginForm.controls;
  }

}
