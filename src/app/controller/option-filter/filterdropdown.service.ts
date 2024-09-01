import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterdropdownService {

  private dropdownName = "";
  private isOpen = false;

  constructor() { }

  setDropDownName(name: string){
    this.dropdownName = name;
  }

  getActiveDropdown(): string{
      return this.dropdownName;
  }

  setIsOpen(isOpen: boolean){
    this.isOpen = isOpen;
  }

  getIsOpen(): boolean{
    return this.isOpen;
  }

}
