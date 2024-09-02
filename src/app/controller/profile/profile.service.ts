import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currentChracter: any;

  constructor() { }

  setCurrentCharacter(newCharacter: any){
    this.currentChracter = newCharacter
  }

  getCurrentCharacter(){
    return this.currentChracter;
  }

}
