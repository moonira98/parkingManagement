import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IBuilding, IFloor, ISite, ResponseModel } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  masterService = inject(MasterService)
  siteList: ISite[] = []
  buildingList: IBuilding[] = []
  floorList: IFloor[] = []
  siteId: number = 0
  buildingId: number = 0
  floorId: number = 0
  parkingSpotArray: any[] = []
  @ViewChild("bookSpot") bookModal!: ElementRef

  bookSpotObj: any = {
    
      "parkId": 0,
      "floorId": 0,
      "custName": "",
      "custMobileNo": "",
      "vehicleNo": "",
      "parkDate": new Date(),
      "parkSpotNo": 0,
      "inTime": new Date(),
      "outTime": null,
      "amount": 0,
      "extraCharge": 0,
      "parkingNo": ""
    
  }

  bookSpotList: any [] = []

  ngOnInit() {
    this.getSites()
  }

  checkIfSpotBooked(spotNo: number) {
    const isExist = this.bookSpotList.find(m => m.parkSpotNo == spotNo);
    console.log('Check spot:', spotNo, 'Booked:', isExist);
    return isExist;
  }

  openModal(spotNo: number) {
    this.bookSpotObj.parkSpotNo = spotNo
    this.bookSpotObj.floorId = this.floorId
    if(this.bookModal) {
      this.bookModal.nativeElement.style.display = 'block'
    }
  }

  closeModal() {
    if(this.bookModal) {
      this.bookModal.nativeElement.style.display = 'none'
    }
  }


  getSites() {
    this.masterService.getSitesByClientId().subscribe((res: ResponseModel) => {
      this.siteList = res.data
    })
  }

  getBuildingBySiteId() {
    this.masterService.getBuildingsBySitetId(this.siteId).subscribe((res: any) => {
      this.buildingList = res.data
    })
  }

  getFloorByBuildingId() {
    this.masterService.getFloorsByBuildingId(this.buildingId).subscribe((res: any) => {
      this.floorList = res.data
    })
  }

  onFloorSelect() {
    const floor = this.floorList.find((m: any) => m.floorId === Number(this.floorId));
  
    if (!floor) {
      // Можно вывести предупреждение или просто выйти
      console.warn('Этаж не найден');
      return;
    }
  
    this.parkingSpotArray = []; // очищаем перед добавлением
    for (let index = 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSpotArray.push(index);
    }
    this.getBooking()
      
    



  }

  onBookSpot() {
    this.masterService.bookSpot(this.bookSpotObj).subscribe((res: any) => {
      alert('saved');
      this.closeModal();
      this.getBooking();
    });
  }


  getBooking() {
    this.masterService.getAllParkingByFloor(this.floorId).subscribe((res: any) => { 
      this.bookSpotList = res.data
    })
  }

 

}
