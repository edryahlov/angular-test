import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { DataService } from "../data.service"
import {isArray} from "util";

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css'],
})
export class BreedComponent implements OnInit, OnDestroy {

    private routeSub:any;
    slug:string;
    img:string;
    state:string;
    breedName:string;
    list:any=[];

    constructor(
        private route: ActivatedRoute,
        private dataService:DataService,
    ) { }

    breedSelect(breed) {
        // /api/breed/{breed name}/{sub-breed name}/images/random
        if (breed.match(/-/g)) {breed = breed.replace(/(\w+)-(\w+)/g,'$1\/$2')}
        console.log(breed)
        this.dataService.get('https://dog.ceo/api/breed/'+breed+'/images/random').subscribe(data => {
            this.img = data['message'];
            this.state = 'founded';
            this.breedName = data['message'].replace(/(https:\/\/dog.ceo\/api\/img\/)(.*)\/(.*)/g,'$2');
            console.log('onSelect: ',breed)
        });
    }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {
          console.log(params);

          if (params.slug) {
              this.slug = params.slug.toUpperCase();
              // this.state = 'xxxx'
          } else {
              this.state = 'default'
          }
          this.dataService.get('https://dog.ceo/api/breeds/list/all').subscribe(data => {
              // this.list = Object.keys(data['message']).map(key=>key);

              // с подпородами не разобрался как запрос делать
              for (let key in data['message']) {
                  this.list.push(key);
                  if (data['message'][key].length > 0) data['message'][key].map(d=>this.list.push(key+'-'+d));
              }
              console.log(this.list)
          });

          let path:string;
          if (this.state === 'default') {path = 'https://dog.ceo/api/breeds/image/random';}
          else {path = 'https://dog.ceo/api/breed/' + params.slug + '/images/random';}

          // console.log(params.slug)

          this.dataService.get(path).subscribe(data => {
              // console.log('message>>',data['message']);
              if (data['status'] !== 'error') {
                  this.img = data['message'];
                  this.breedName = data['message'].replace(/(https:\/\/dog.ceo\/api\/img\/)(.*)\/(.*)/g,'$2');
                  // console.log(this.breedName)
                  this.state = 'founded';
                  // this.breedGet = params;
                  console.log(data)
              } else {
                  this.state = 'not found';
                  console.log(data)
              }
              // console.log('inside ',found)
          });

      })

  }
  ngOnDestroy() {
      this.routeSub.unsubscribe();
  }

}


