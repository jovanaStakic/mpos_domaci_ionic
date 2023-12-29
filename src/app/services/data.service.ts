import { Injectable } from '@angular/core';
import {collection, Firestore, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Auth } from '@firebase/auth';
export interface Recepie {
  myId?: number;
  title: string;
  description: string;
  difficulty: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getRecepies(){
    const recepies = collection(this.firestore, 'recepies');
    return collectionData(recepies, { idField: 'myId' });
    
  }
  addRecepie(recepie: Recepie) {
    const recepieRef = collection(this.firestore, 'recepies');
    return addDoc(recepieRef, recepie);
  }
  
  deleteRecepie(recepie: Recepie) {
    const recepieRef = doc(this.firestore, `recepies/${recepie.myId}`);
    return deleteDoc(recepieRef);
  }
  updateRecepie(recepie: Recepie) {
    console.log(recepie.myId);
    console.log(""+recepie.title);
    console.log(recepie.description);
    console.log(recepie.difficulty);
    const recepieRef = doc(this.firestore, `recepies/${recepie.myId}`);
     return updateDoc(recepieRef, {
       title: recepie.title,
      description: recepie.description,
       difficulty: recepie.difficulty
   });
  
  }
}