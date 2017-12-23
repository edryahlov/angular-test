import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

    public get(url: string) {
        return this.http.get(url);
    }

}
