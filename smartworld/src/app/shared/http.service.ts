import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) { }

  getAllUsers(page:number, size: number): Observable<any>{
    return this._http.get(`https://reqres.in/api/users?page=${page}&per_page=${size}`)
  }
}
