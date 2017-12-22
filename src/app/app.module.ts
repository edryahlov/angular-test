import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { HomeComponent } from './home/home.component';
import { BreedComponent } from './breed/breed.component';
import { HttpClientModule } from "@angular/common/http";


const routes = [
    {path: '',component: HomeComponent},
    {path: ':slug',pathMatch:'full',component: BreedComponent},
    // {path: 'server',pathMatch:'full',component: ServerComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    HomeComponent,
    BreedComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
