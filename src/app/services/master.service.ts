import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/user.model';
import { UserService } from './user.service';

import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient)
  userService = inject(UserService)
  baseURL = environment.baseURL


  constructor() { }

  getSitesByClientId(): Observable<ResponseModel> {
    const clientId = this.userService.loggedUserData.extraId
    return this.http.get<ResponseModel>(`${this.baseURL}GetSitesByClientId?id=${clientId}`)
  }

  getBuildingsBySitetId(siteId: number): Observable<ResponseModel> {
    const clientId = this.userService.loggedUserData.extraId
    return this.http.get<ResponseModel>(`${this.baseURL}GetBuildingBySiteId?id=${siteId}`)
  }

  getFloorsByBuildingId(buildingId: number): Observable<ResponseModel> {
    const clientId = this.userService.loggedUserData.extraId
    return this.http.get<ResponseModel>(`${this.baseURL}GetFloorsByBuildingId?id=${buildingId}`)
  }

  getAllParkingByFloor(floorId: number): Observable<ResponseModel> {
   
    return this.http.get<ResponseModel>(`${this.baseURL}GetAllParkingByFloor?id=${floorId}`)
  }


  bookSpot (obj: any):  Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseURL}AddParking`, obj)
  }
}
