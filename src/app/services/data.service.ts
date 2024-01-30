import { Injectable } from '@angular/core';
import {collection, Firestore, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { QueryDocumentSnapshot, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';

export interface Recepie {
  myId?: string;
  title: string;
  description: string;
  difficulty: number;
  date: string;
  userId:string;
  ingredients: Ingredient[]
}
export interface Ingredient{
  id:number;
  naziv:String
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  async getSastojciForRecept(receptId: string): Promise<Ingredient[]> {
    const receptDocRef = doc(this.firestore, 'recepies', receptId);
    const receptSnapshot = await getDoc(receptDocRef);
    if (!receptSnapshot.exists()) {
      return [];
    }
    const receptData = receptSnapshot.data();
    const sastojakIds = receptData["ingredients"];
    let sastojci: Ingredient[] = [];

  for (let id of sastojakIds) {
    const querySnapshot = await getDocs(query(collection(this.firestore, 'ingredient'), where('id', '==', id)));
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      let sastojakData = { ...doc.data()} as Ingredient;
      sastojci.push(sastojakData);
    });
  }

  return sastojci;

}
  async getRecepiesWithIngredients(userId: string): Promise<Recepie[]> {
    const queryRecepies = this.getRecepies(userId);
    const recepies = await firstValueFrom(queryRecepies);
    let recepiesWithIngredients: Recepie[] = [];
  
    for (const recept of recepies) {
      const sastojci = await this.getSastojciForRecept(recept.myId);
      recepiesWithIngredients.push({
        ...recept,
        ingredients: sastojci
      } as Recepie); 
    }
  
    return recepiesWithIngredients;
  }
  getRecepies(userId:string){
    
    const recepiesRef = collection(this.firestore, 'recepies');
    const queryRecepies = query(recepiesRef, where("userId", "==", userId), orderBy("title", "asc"));
    return collectionData(queryRecepies, { idField: 'myId' });
    
  }
 
  addRecepie(recepie: Recepie): Promise<string> {
    const recepieRef = collection(this.firestore, 'recepies');
  
    const recepieToSave = {
      ...recepie,
      ingredients: recepie.ingredients.map(ingredient => ingredient.id)
    };
  
    return addDoc(recepieRef, recepieToSave).then(docRef => docRef.id);
  }
  
  deleteRecepie(recepie: Recepie) {
    const recepieRef = doc(this.firestore, `recepies/${recepie.myId}`);
    return deleteDoc(recepieRef);
  }
  updateRecepie(recepie: Recepie) {
    
    const recepieRef = doc(this.firestore, `recepies/${recepie.myId}`);
     return updateDoc(recepieRef, {
       title: recepie.title,
      description: recepie.description,
       difficulty: recepie.difficulty
   });
  
  }
  getRecepiesCount(userId:string){
    const recepiesRef = collection(this.firestore, 'recepies');
    const queryRecepies = query(recepiesRef, where('userId', '==', userId));
    return collectionData(queryRecepies, { idField: 'myId' })
      .pipe(
        map(recepies => recepies.length)
      );
  }

  getIngredients(): Observable<Ingredient[]> {
    const ingredientsRef = collection(this.firestore, 'ingredient');
    const queryIngredients = query(ingredientsRef, orderBy("naziv", "asc"));
    return collectionData(queryIngredients) as Observable<Ingredient[]>;
  }
}