import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilterOption } from '../../models/filter-option';

@Injectable({
  providedIn: 'root'
})
export class FilterBlockService {

  private apiUrl = 'https://swapi.dev/api'

  filterList : any[] = [
    {
      name: "Movie Name",
      listData: [
        {name: "All", checked: true}
      ],
      field: "films"
    },
     {
      name: "Species",
      listData: [
        {name: "All", checked: true}
      ],
      field: "species"
    },
    {
      name: "Vehicle",
      listData: [
        {name: "All", checked: true}
      ],
      field: "vehicles"
    },
     {
      name: "Star Ships",
      listData: [
        {name: "All", checked: true}
      ],
      field: "starships"
    },
    {
      name: "Birth Year",
      listData: [
        {name: "All", checked: true}
      ],
      field: "birth"
    }
  ];

  constructor(private http: HttpClient) { 
  }

  getFullData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getFilterList(){
    return this.filterList;
  }

  setFilterList(){
    debugger;
    this.getFullData().subscribe(async (data)=> {
      const promises: any = []
      for(let key in data){
        const promise = await fetch(`${data[key]}`);
        const response = await promise.json();
        promises.push(response);
      }
      Promise.all(promises).then((value)=>{
        console.log(value);
        const answer = value;
        value.forEach(item => {
          if(item.count > 10){
            console.log(item.count/10);
          }
        })
      })
       
    })
  }

  setFilterListOptions(name: string, option: FilterOption){
    debugger;
     let alteringIndex = this.filterList.findIndex((item: any) => item.name === name)
     let removingIndex = this.filterList[alteringIndex].listData.findIndex((item: any) => item.name === option.name);
     this.filterList[alteringIndex].listData.splice(removingIndex, 1, option);
  }
  

}
