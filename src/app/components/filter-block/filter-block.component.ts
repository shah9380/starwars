import { Component, OnInit} from '@angular/core';
import { FilterBlockService } from '../../controller/filter-block/filter-block.service';
import { FilterOption } from '../../models/filter-option';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrl: './filter-block.component.scss'
})

export class FilterBlockComponent implements OnInit {
  constructor(public filterblockservice: FilterBlockService){}

  ngOnInit(): void {
      
  }

  search(){
    this.filterblockservice.setFilterList();
  }
}
