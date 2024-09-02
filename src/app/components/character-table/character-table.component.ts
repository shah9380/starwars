import { Component, OnInit } from '@angular/core';
import { FilterBlockService } from '../../controller/filter-block/filter-block.service';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.scss'
})
export class CharacterTableComponent implements OnInit {

  constructor(public blockService: FilterBlockService){}
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
  }
}
