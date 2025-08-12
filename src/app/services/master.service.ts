import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient)
  userService = inject(UserService)
  apiUrl: string = 'https://api.freeprojectapi.com/api/SmartParking/'


  constructor() { }

  getSitesByClientId(): Observable<ResponseModel> {
    const clientId = this.userService.loggedUserData.extraId
    return this.http.get<ResponseModel>(`${this.apiUrl}GetSitesByClientId?id=${clientId}`)
  }

  getBuildingsBySitetId(siteId: number): Observable<ResponseModel> {
    const clientId = this.userService.loggedUserData.extraId
    return this.http.get<ResponseModel>(`${this.apiUrl}GetBuildingBySiteId?id=${siteId}`)
  }

  getFloorsByBuildingId(buildingId: number): Observable<ResponseModel> {
    const clientId = this.userService.loggedUserData.extraId
    return this.http.get<ResponseModel>(`${this.apiUrl}GetFloorsByBuildingId?id=${buildingId}`)
  }

  getAllParkingByFloor(floorId: number): Observable<ResponseModel> {
   
    return this.http.get<ResponseModel>(`${this.apiUrl}GetAllParkingByFloor?id=${floorId}`)
  }


  bookSpot (obj: any):  Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}AddParking`, obj)
  }
}
