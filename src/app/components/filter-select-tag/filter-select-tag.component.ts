import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FilterdropdownService } from '../../controller/option-filter/filterdropdown.service';
import { FilterBlockService } from '../../controller/filter-block/filter-block.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter-select-tag',
  templateUrl: './filter-select-tag.component.html',
  styleUrl: './filter-select-tag.component.scss'
})
export class FilterSelectTagComponent implements OnInit {
  @Input() dropDownName: any;
  @Input() dropDownData: any = [];
  @Input() field: any = "";
  nextUrl: string | null = `https://swapi.dev/api/${this.field}/?page=1`;

  constructor(
    public dropService: FilterdropdownService, 
    public blockService: FilterBlockService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.nextUrl = `https://swapi.dev/api/${this.field}/?page=1`;
    this.fetchData();
  }

  fetchData() {
    if (this.nextUrl && this.field !== "people") {
      this.http.get(this.nextUrl).subscribe((data: any) => {
        // this.dropDownData = [...this.dropDownData, ...data.results];
        let foundResult =  this.blockService.getFilterList().find(obj => obj.field === this.field)
        if(foundResult.listData[0].checked === true){
          this.blockService.setFilterList(this.field, data.results.map((keto: any) => ({...keto, checked: true}) ))
        }else{
          this.blockService.setFilterList(this.field, data.results)
        }
        this.nextUrl = data.next; // Update nextUrl to the next page
      });
    }else if(this.nextUrl && this.field === "people"){
      this.http.get(this.nextUrl).subscribe((data: any) => {
        // this.dropDownData = [...this.dropDownData, ...data.results];
        // console.log(this.blockService.getFilterList())
        let foundResult =  this.blockService.getFilterList().find(obj => obj.field === this.field)
        if(foundResult.listData[0].checked === true){
          this.blockService.setFilterList(this.field, data.results.map((keto: any) => ({...keto, checked: true}) ))
        }else{
          this.blockService.setFilterList(this.field, data.results)
        }
        this.nextUrl = data.next; // Update nextUrl to the next page
      });
    }
  }

  toggleDropdown(event: any) {
    event.stopPropagation();
    if (this.dropService.getActiveDropdown() !== this.dropDownName) {
      this.dropService.setIsOpen(false);
    }
    this.dropService.setDropDownName(this.dropDownName);
    this.dropService.setIsOpen(!this.dropService.getIsOpen());
  }

  onScroll(event: any) {
    debugger;
    // console.log(event);
    const element = event.target;
    console.log(element.scrollTop);
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // Reached the bottom
      this.fetchData();
    }
  }

  optionChange(event: any, option: any) {
    debugger;
    if((option.name === "All" || option.title === "All" || option.birth_year === "All") && event.target.checked === true){
      this.blockService.setFilterListClear(this.field, { ...option, checked: event.target.checked })
    }else if((option.name === "All" || option.title === "All" || option.birth_year === "All") && event.target.checked === false){
      this.blockService.setFilterListClear(this.field, { ...option, checked: event.target.checked })
    }else{
      this.blockService.setFilterListOptions(this.dropDownName, { ...option, checked: event.target.checked });
      console.log(this.blockService.getFilterList());
    }
    
  }

}
