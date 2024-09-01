import { Component, HostListener, Input } from '@angular/core';
import { FilterOption } from '../../models/filter-option';
import { FilterdropdownService } from '../../controller/option-filter/filterdropdown.service';
import { FilterBlockService } from '../../controller/filter-block/filter-block.service';

@Component({
  selector: 'app-filter-select-tag',
  templateUrl: './filter-select-tag.component.html',
  styleUrl: './filter-select-tag.component.scss'
})
export class FilterSelectTagComponent {
  @Input() dropDownName: any;
  @Input() dropDownData: any;

  constructor(public dropService: FilterdropdownService, private blockService: FilterBlockService){
    
  }


  toggleDropdown(event: any) {
    event.stopPropagation();
    if(this.dropService.getActiveDropdown() !== this.dropDownName){
      this.dropService.setIsOpen(false)
    }
    this.dropService.setDropDownName(this.dropDownName);
    this.dropService.setIsOpen(!this.dropService.getIsOpen())
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropService.setIsOpen(false); // Close dropdown when clicked outside
    }
  }

  optionChange(event: any, option: any){
    debugger;
    this.blockService.setFilterListOptions(this.dropDownName, {...option, checked: event.target.checked});
  }
}
