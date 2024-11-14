import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { AutheticationService } from './services/authetication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userName: string | null = 'Login';

  constructor(
    private authService: AutheticationService,
    private router: Router,
    private auth: Auth
  ) {
    this.checkUserStatus();
  }

  checkUserStatus() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userName = user.displayName || 'Usuário'; // Substitua por outra propriedade se `displayName` for nulo
      } else {
        this.userName = 'Login';
      }
    });
  }

  logout() {
    this.authService.singOut().then(() => {
      this.userName = 'Login'; // Redefina o nome do usuário após o logout
      this.router.navigate(['/index']); // Redireciona para a página de login
    }).catch((error) => {
      console.error('Erro ao deslogar', error);
    });
  }
}
