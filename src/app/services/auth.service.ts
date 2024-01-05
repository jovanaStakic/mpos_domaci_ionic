import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public email!: string;
  public userId!:string;

  constructor(private auth:Auth) { }
  async register({ email, password }: { email: string, password: string }) {
    try {
      const user =await createUserWithEmailAndPassword(this.auth, email, password);
      this.email=email;
      this.userId=user.user.uid;
      return user;
    } catch (e) {
      return null; 
    }

  }
 
  async login({ email, password }: { email: string, password: string }) {
    try {
      const user =await signInWithEmailAndPassword(this.auth, email, password);
      this.email=email;
      this.userId=user.user.uid;
      return user;
    } catch (e) {
      return null; 
    }

  }

  logout() {
    this.email='';
    this.userId='';
    return signOut(this.auth);
   }
}
