import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css'],
})
export class BreedComponent implements OnInit, OnDestroy {

    private routeSub:any;
    slug:string;
    img:string;

    constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {
         console.log(params);
          this.http.get('https://dog.ceo/api/breed/'+params.slug+'/images/random').subscribe(data => {
              // console.log('message>>',data['message'][0]);
              this.img = data['message'];
          });
         // this.slug = params.slug;
         this.slug = params.slug;
         getBreed(params.slug);
      })
  }
  ngOnDestroy() {
      this.routeSub.unsubscribe()
  }

  // slug = this.breed


}

function getBreed(breed) {
    console.log('we calls a "'+breed+'"');
}