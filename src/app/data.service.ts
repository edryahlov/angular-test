import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

    public get(url: string) {
        // return this.httpClient.get(url);
        return this.http.get(url)//.subscribe(data => {});
    }

    cars = [
        'Ford','Chevrolet','Buick'
    ];


    myData() {
        return 'This is my data, man!';
    }


}
