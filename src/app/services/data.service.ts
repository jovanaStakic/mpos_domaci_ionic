import { Injectable } from '@angular/core';
import {collection, Firestore, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { orderBy, query } from 'firebase/firestore';
import { map } from 'rxjs';

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
    const recepiesRef = collection(this.firestore, 'recepies');
    const queryRecepies = query(recepiesRef, orderBy("title", "asc"));
    return collectionData(queryRecepies, { idField: 'myId' });
    
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
  getRecepiesCount(){
    const recepiesRef = collection(this.firestore, 'recepies');
    
    return collectionData(recepiesRef, { idField: 'myId' })
      .pipe(
        map(recepies => recepies.length)
      );
  }
}