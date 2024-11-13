import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authentication.service';
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
    private authService: AutheticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async loginUser() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.loginForm.valid) {
      try {
        const user = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        if (user) {
          loading.dismiss();
          this.router.navigate(['/index']); // Ajuste a rota conforme necessário
        }
      } catch (error) {
        console.error('Erro de login:', error);
        loading.dismiss();
        // Adicione aqui uma mensagem de erro amigável
      }
    } else {
      loading.dismiss();
      console.log('Preencha o formulário corretamente.');
    }
  }
}
