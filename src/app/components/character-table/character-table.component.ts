import { Component, OnInit } from '@angular/core';
import { FilterBlockService } from '../../controller/filter-block/filter-block.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../controller/profile/profile.service';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.scss'
})
export class CharacterTableComponent implements OnInit {

  constructor(public blockService: FilterBlockService, private router: Router, private profileCtrl: ProfileService){}
  dummyArray: number[] = new Array(5).fill(0);
  ngOnInit(): void {
      this.blockService.getFilterData();
  }

  pageSize = 5; // Number of items per page
  currentPage = 1; // Current page number

  get paginatedCharacters() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.blockService.getFilterData().slice(startIndex, startIndex + this.pageSize);
  }

  getCountOfPages(){
    return Math.ceil(this.blockService.getFilterData().length/this.pageSize)
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  isPreviousPageAvailable() {
    return this.currentPage > 1;
  }

  isNextPageAvailable() {
    return this.currentPage < this.getCountOfPages();
  }

  characterProfile(character: any){
    console.log(character);
    const url = character.url;
    const parts = url.split('/');
    const number = parts[parts.length - 2]; // This will give you "1"
    console.log(number); // Output: 1
    this.profileCtrl.setCurrentCharacter(character);
    this.router.navigate([`profile/${number}`])
  }
}
