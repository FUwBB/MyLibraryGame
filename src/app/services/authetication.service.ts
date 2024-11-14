import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngFireAuth: AngularFireAuth) {}

  // Método de registro atualizado para incluir o displayName
  async registerUser(email: string, password: string, displayName: string) {
    const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    if (userCredential.user) {
      await userCredential.user.updateProfile({ displayName });
    }
    return userCredential;
  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async singOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
}
