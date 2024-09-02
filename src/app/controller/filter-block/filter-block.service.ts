import { Injectable } from '@angular/core';
import { filter, Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilterOption } from '../../models/filter-option';

@Injectable({
  providedIn: 'root'
})
export class FilterBlockService {

  private apiUrl = 'https://swapi.dev/api'

  public promise: any;

  private loader = true;

  list : any[] = [
    {
      name: "Movie Name",
      listData: [
        {title: "All", checked: true}
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
        {birth_year: "All", checked: true}
      ],
      field: "people"
    }
  ];

  constructor(private http: HttpClient) { 
  }

  getLoader(){
    return this.loader;
  }

  setLoader(state: boolean){
    this.loader = state;
  }
  getFullData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getFilterList(){
    return this.list;
  }

  setList(list: any){
    this.list = list;
  }

  setFilterList(field: string, newlist: any){

    let index = this.list.findIndex((item)=> item.field === field);

    this.list[index].listData.push(...newlist)
       
  }

  setFilterListClear(field: string, newlist: any){
    ;
    let index = this.list.findIndex((item)=> item.field === field);
    // this.list = this.list.map(data => {
    //   if(data.field === field){
    //     return data.listData.map((obj: any, i: any) => {
    //         if(i === 0){
    //           return {...obj[i], checked: true}
    //         }
    //         return obj;
    //     })
    //   }
    //   return data;
    // })

    this.list[index].listData = this.list[index].listData.map((item: any, i: number) => {
        if(i === 0){
          return {...item, checked: newlist.checked}
        }
        return {...item, checked: newlist.checked}
    })

    // this.list[index].listData = [...this.list[index].listData, ...newlist]
  }

  setFilterListOptions(name: string, option: any){
    ;
     let alteringIndex = this.list.findIndex((item: any) => item.name === name)
     if(name === 'Movie Name'){
      var removingIndex = this.list[alteringIndex].listData.findIndex((item: any) => item.title === option.title);
     }else{
       removingIndex = this.list[alteringIndex].listData.findIndex((item: any) => item.name === option.name);
     }
     if(option.checked === false){
      this.list[alteringIndex].listData[0] = {...this.list[alteringIndex].listData[0], checked: false}
     }
     this.list[alteringIndex].listData.splice(removingIndex, 1, option);
  }


  getFilterData(){
    ;
    let filteredData = this.list.map(item => {
      let listData = item.listData.filter((data: any)=> data.checked === true);
      return {...item, listData}
    })

    let filteringConditions: any = {}

    filteredData.forEach((item)=> {
        filteringConditions = {...filteringConditions, [item.field]: [...item.listData.map((obj: any) => {
          if(item.field === "people") return {birth_year: obj?.birth_year}
          return {url: obj?.url}
        })] }
    })

    // this.list[this.list.length -1].listData.filter(((item: any) => item.birth_year !== "All"))

      const fullData = this.list[this.list.length -1].listData.filter(((item: any) => item.birth_year !== "All"));

      let foundingData : any= [];
      let filterinfData : any= fullData;
    for(let key in filteringConditions){
      // let temp = this.list[this.list.length -1].listData;
      
      let fribData : any= [];
      for (const item of filteringConditions[key]) {
        let fredData: any = [];
        if (item?.url === undefined && item?.birth_year === undefined) {
          fribData = [...filterinfData.map((obj: any) => obj)];
            break; // This will exit the loop
        }
        if (item?.url) {
          fredData = [...fredData,
                ...filterinfData.filter((obj: any) =>
                    obj[key].some((it: any) => it.includes(item?.url))
                ),
            ];
        }
        if (item?.birth_year && item?.birth_year !== "All") {
          fredData = [...fredData,
                ...filterinfData.filter((obj: any) =>
                    obj.birth_year === (item?.birth_year)
                ),
            ];
        }
        fribData = [...fribData, ...fredData];
     }

      filterinfData = this.removeDuplicates(fribData, "url")
      foundingData = [...foundingData, ...filterinfData]
    }

    return filterinfData;
  }

  removeDuplicates(arr: any, key: any) {
    const seen = new Set();
    return arr.filter((item: any) => {
        const duplicate = seen.has(item[key]);
        seen.add(item[key]);
        return !duplicate;
    });
  }

  filterDataByConditions(dataArray: any, conditionalObj: any) {
    return dataArray.filter((item: any) => {
        // Check each key in the conditionalObj
        return Object.keys(conditionalObj).some(key => {
            const conditionValues = conditionalObj[key].map((cond: any) => cond.url || cond.birth_year);

            // If there are no conditions for this key, skip the check
            if (conditionValues.length === 0) {
                return false;
            }

            // Check if the item has the key and if there's an intersection of values
            if (key === "birth_year") {
                // Special handling for 'people' key using birth_year
                return conditionValues.includes(item.birth_year);
            }

            return item[key] && item[key].some((value: any) => conditionValues.includes(value));
        });
    });
}
  

}
