import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { AutheticationService } from 'src/app/services/authetication.service';  

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  email: any;
  userName: string | null = 'Login';  // Inicializa com 'Login'


  constructor(
    public authService: AutheticationService,
    public router: Router,
    private auth: Auth,

  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userName = user.displayName || '';  
      } else {
        this.userName = 'Login'; 
      }
    });
  }

  async resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
