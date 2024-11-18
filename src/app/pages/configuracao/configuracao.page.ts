import { Component, OnInit } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  email: any;

  constructor(
    public authService: AutheticationService,
    public router: Router
  ) {}

  ngOnInit() {}

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
