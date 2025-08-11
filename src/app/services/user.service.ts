import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUserModel, User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  loggedData!: IUserModel
  constructor() { }

  loginUser(obj: User): Observable<IUserModel> {
    return this.http.post<IUserModel>("https://api.freeprojectapi.com/api/SmartParking/login", obj)
  }
}
