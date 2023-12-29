import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email!: string;
  constructor(private auth:Auth) { }
  async register({ email, password }: { email: string, password: string }) {
    try {
      const user =await createUserWithEmailAndPassword(this.auth, email, password);
      this.email=email;
      return user;
    } catch (e) {
      return null; 
    }

  }
 
  async login({ email, password }: { email: string, password: string }) {
    try {
      const user =await signInWithEmailAndPassword(this.auth, email, password);
      this.email=email;
      
      return user;
    } catch (e) {
      return null; 
    }

  }

  logout() {
    this.email='';
    return signOut(this.auth);
   }
}
