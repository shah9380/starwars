import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../controller/profile/profile.service';
import { FilterBlockService } from '../../controller/filter-block/filter-block.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  characterId: string = '';
  character: any = {};
  films: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  homeworldName: string = '';
  speciesName: string = '';
  visibleFilm: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private profileCtrl: ProfileService, private blockService: FilterBlockService) {}

  ngOnInit(): void {
    // Get the ID from the URL
    this.route.paramMap.subscribe(params => {
      this.characterId = params.get('id') ?? '';
      this.fetchCharacterData(this.characterId);
    });
  }

  fetchCharacterData(id: string) {
    debugger;
    const apiUrl = `https://swapi.dev/api/people/${id}/`;
      this.character = this.profileCtrl.getCurrentCharacter();
      if(!this.character){
        this.http.get(apiUrl).subscribe((data: any) => {
          this.character = data;
          this.profileCtrl.setCurrentCharacter(this.character);
          this.fetchAdditionalData();
        });
      }else{
        this.fetchAdditionalData();
      }
  }

  fetchAdditionalData() {
    // Fetch homeworld name
    this.http.get(this.character.homeworld).subscribe((homeworldData: any) => {
      this.homeworldName = homeworldData.name;
    });

    // Fetch species name
    if (this.character.species.length > 0) {
      this.http.get(this.character.species[0]).subscribe((speciesData: any) => {
        this.speciesName = speciesData.name;
      });
    }

    const filmData = this.blockService.getFilterList().find((item: any)=> item?.field === 'films')
    
    debugger;
    // Fetch films
    this.character.films.forEach((filmUrl: string) => {
      if(filmData?.listData.length > 1){
        let dataFound = filmData.listData.find((item: any)=> item?.url === filmUrl)
        this.films.push(dataFound);
      }else{
        this.http.get(filmUrl).subscribe((filmData: any) => {
          this.films.push(filmData);
          console.log(this.films);
        });
      }
      
    });


    // Fetch vehicles
    this.character.vehicles.forEach((vehicleUrl: string) => {
      this.http.get(vehicleUrl).subscribe((vehicleData: any) => {
        this.vehicles.push(vehicleData);
      });
    });

    // Fetch starships
    this.character.starships.forEach((starshipUrl: string) => {
      this.http.get(starshipUrl).subscribe((starshipData: any) => {
        this.starships.push(starshipData);
      });
    });
  }

  toggleDetails(film: any): void {
    this.visibleFilm = this.visibleFilm === film ? null : film;
  }

  isDetailsVisible(film: any): boolean {
    return this.visibleFilm === film;
  }
}