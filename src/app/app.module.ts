import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FilterBlockComponent } from './components/filter-block/filter-block.component';
import { FilterSelectTagComponent } from './components/filter-select-tag/filter-select-tag.component';
import { provideHttpClient } from '@angular/common/http';
import { CharacterTableComponent } from './components/character-table/character-table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    FilterBlockComponent,
    FilterSelectTagComponent,
    CharacterTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync('noop'),],
  bootstrap: [AppComponent]
})
export class AppModule { }
