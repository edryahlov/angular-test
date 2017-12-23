import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { DataService } from "../data.service"

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
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

    //при выборе породы в списке
    breedSelect(breed) {
        if (breed.match(/-/g)) {breed = breed.replace(/(\w+)-(\w+)/g,'$1\/$2');} //переделывам ссылку - разные запросы на породу и под-породы
        this.dataService.get('https://dog.ceo/api/breed/'+breed+'/images/random').subscribe(data => {
            this.img = data['message'];
            this.state = 'founded';
            this.breedName = data['message'].replace(/(https:\/\/dog.ceo\/api\/img\/)(.*)\/(.*)/g,'$2');
        });
    }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {

          if (params.slug) this.slug = params.slug.toUpperCase();
          else this.state = 'default'

          //делаем запрос на список и в селект его
          this.dataService.get('https://dog.ceo/api/breeds/list/all').subscribe(data => {
              for (let key in data['message']) {
                  this.list.push(key);
                  //если есть под-породы - их тоже добавляем
                  if (data['message'][key].length > 0) data['message'][key].map(d=>this.list.push(key+'-'+d));
              }
          });

          let path:string;
          let pathDetail:string;

          if (this.state === 'default') {path = 'https://dog.ceo/api/breeds/image/random';} //рандомная картинка если ничего не выбрано и нет слага
          else {
              //тут модифицируем запрос - если есть под-порода
              pathDetail = params.slug;
              if (pathDetail.match(/-/g)) {pathDetail = pathDetail.replace(/(\w+)-(\w+)/g,'$1\/$2')}
              path = 'https://dog.ceo/api/breed/' + pathDetail + '/images/random';
          }

          this.dataService.get(path).subscribe(data => {
              if (data['status'] !== 'error') { //все хорошо
                  this.img = data['message'];
                  this.breedName = data['message'].replace(/(https:\/\/dog.ceo\/api\/img\/)(.*)\/(.*)/g,'$2');
                  this.state = 'founded';
              } else { //все не оч)
                  this.state = 'not found';
              }
          });

      })

  }
  ngOnDestroy() {
      this.routeSub.unsubscribe();
  }

}


