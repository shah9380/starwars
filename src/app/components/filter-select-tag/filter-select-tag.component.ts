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
  species = 1;
  people = 1;

  

  constructor(
    public dropService: FilterdropdownService, 
    public blockService: FilterBlockService,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    this.nextUrl = `https://swapi.dev/api/${this.field}/?page=1`;
    ;
    this.fetchData();
    console.log(this.blockService.getLoader());
  }

   fetchData() {
    if (this.nextUrl && this.field === "species" && this.species === 1) {
      this.http.get(this.nextUrl).subscribe( async (data: any) => {
        // this.dropDownData = [...this.dropDownData, ...data.results];
        let foundResult =  this.blockService.getFilterList().find(obj => obj.field === this.field)
        if(foundResult.listData[0].checked === true){
          this.blockService.setFilterList(this.field, data.results.map((keto: any) => ({...keto, checked: true}) ))
        }else{
          this.blockService.setFilterList(this.field, data.results)
        }
        this.nextUrl = data.next; // Update nextUrl to the next page
        for(let i=2;i<=Math.ceil(data.count/10);i++){
          if(i ===Math.ceil(data.count/10)){
            this.species = 0;
          }

          const response = await fetch(`https://swapi.dev/api/${this.field}/?page=${i}`)
          const newData = await response.json();
            // this.dropDownData = [...this.dropDownData, ...data.results];
            let foundResult =  this.blockService.getFilterList().find(obj => obj.field === this.field)
            if(foundResult.listData[0].checked === true){
              this.blockService.setFilterList(this.field, newData.results.map((keto: any) => ({...keto, checked: true}) ))
            }else{
              this.blockService.setFilterList(this.field, newData.results)
            }
            if(i === Math.ceil(newData.count/10)){
              console.log(newData.count/10)
              console.log(this.blockService.getFilterList())
                const dataArray =  this.blockService.getFilterList().map((item)=>{
                  if(item.field === 'people'){
                    console.log(item.listData.length);
                    const updatedData = item.listData.map((obj: any) => {
                      let speciesName = 'unknown'
                      if(obj.birth_year === 'All'){
                        return obj;
                      }
                      if(obj.species.length === 0){
                          return {...obj, speciesName}
                      }
                      let speciesData =  this.blockService.getFilterList().find(obj => obj.field === 'species');
                      
                      speciesData.listData.forEach((it: any)=>{
                          if(it.url === obj.species[0]){
                            speciesName = it.name;
                          }
                      })
                      return {...obj, speciesName};
                    })
                    return{...item, listData: updatedData};
                  }
                  return item;
                })
                console.log(dataArray);  
                this.blockService.setList(dataArray);
                this.blockService.setLoader(false);
                console.log(this.blockService.getLoader())

            }
            this.nextUrl = newData.next; // Update nextUrl to the next page
            
          
        }
      });
    }else if (this.nextUrl && this.field !== "people") {
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
    }else if(this.nextUrl && this.field === "people" && this.people === 1){
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
        for(let i=2;i<=Math.ceil(data.count/10);i++){
          if(i ===Math.ceil(data.count/10)){
            this.people = 0;
          }
          this.http.get(`https://swapi.dev/api/${this.field}/?page=${i}`).subscribe((data: any) => {
            // this.dropDownData = [...this.dropDownData, ...data.results];
            let foundResult =  this.blockService.getFilterList().find(obj => obj.field === this.field)
            if(foundResult.listData[0].checked === true){
              this.blockService.setFilterList(this.field, data.results.map((keto: any) => ({...keto, checked: true}) ))
            }else{
              this.blockService.setFilterList(this.field, data.results)
            }
            this.nextUrl = data.next; // Update nextUrl to the next page
          });
          
        }
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
    ;
    // console.log(event);
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // Reached the bottom
      this.fetchData();
    }
  }

  optionChange(event: any, option: any) {
    ;
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
