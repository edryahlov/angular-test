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
    service:any;

    constructor(
        private route: ActivatedRoute,
        private dataService:DataService,
    ) { }

    //при выборе породы в списке
    breedSelect(breed) {
        this.service = this.dataService.get('https://dog.ceo/api/breed/'+BreedComponent.modifyPath(breed)+'/images/random').subscribe(data => {
            this.img = data['message'];
            this.state = 'founded';
            this.breedName = BreedComponent.getBreedName(data['message']);
        });
    }
    //вытаскиваем имя породы. в ответе его нет
    static getBreedName = breed => breed.replace(/(https:\/\/dog.ceo\/api\/img\/)(.*)\/(.*)/g,'$2');

    //переделывам ссылку - разные запросы на породу и под-породы
    static modifyPath = path => {
        if (path.match(/-/g)) path = path.replace(/(\w+)-(\w+)/g,'$1\/$2');
        return path;
    };


  ngOnInit() {

      this.routeSub = this.route.params.subscribe(params => {

          if (params.slug) this.slug = params.slug.toUpperCase();
          else this.state = 'default'

          //делаем запрос на список и в селект его
          this.service = this.dataService.get('https://dog.ceo/api/breeds/list/all').subscribe(data => {
              for (let key in data['message']) {
                  this.list.push(key);
                  //если есть под-породы - их тоже добавляем
                  if (data['message'][key].length > 0) data['message'][key].map(d=>this.list.push(key+'-'+d));
              }
          });

          let path:string;
          let pathDetail:string;

          if (this.state === 'default') path = 'https://dog.ceo/api/breeds/image/random'; //рандомная картинка если ничего не выбрано и нет слага
          else path = 'https://dog.ceo/api/breed/' + BreedComponent.modifyPath(params.slug) + '/images/random';

          this.service = this.dataService.get(path).subscribe(data => {
              if (data['status'] !== 'error') { //все хорошо
                  this.img = data['message'];
                  this.breedName = BreedComponent.getBreedName(data['message']);
                  this.state = 'founded';
              } else { //все не оч)
                  this.state = 'not found';
              }
          });

      })

  }
  ngOnDestroy() {
      this.routeSub.unsubscribe();
      this.service.unsubscribe(); //TODO: правильно ли отписываюсь при заборе данных?
  }

}


