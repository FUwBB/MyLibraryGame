import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { AutheticationService } from 'src/app/services/authetication.service';  

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.page.html',
  styleUrls: ['./equipe.page.scss'],
})
export class EquipePage implements OnInit {
  userName: string | null = 'Login';  // Inicializa com 'Login'


  constructor(
    private router: Router,
    private auth: Auth,
    private authService: AutheticationService  
  ) { }

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userName = user.displayName || '';  
      } else {
        this.userName = 'Login'; 
      }
    });
  }

}
