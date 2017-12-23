import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { DataService } from "./data.service"

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BreedComponent } from './breed/breed.component';


const routes = [
    {path: '',component: HomeComponent},
    {path: ':slug',pathMatch:'full',component: BreedComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BreedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
